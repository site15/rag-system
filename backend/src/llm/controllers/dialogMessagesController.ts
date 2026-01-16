// dialogMessagesController.ts - Controller for retrieving dialog messages by dialog ID
// Provides endpoints to fetch message history for specific dialogs

import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { Database } from '../database';
import { Logger } from '../logger';
import { ConfigManager } from '../config';
import {
  ERROR_MESSAGES,
  HTTP_STATUS_CODES,
  SECURITY_CONSTANTS,
} from '../constants';

// Security configuration
const AUTH_TOKEN =
  ConfigManager.getSecurityConfig().hardCodedToken ||
  SECURITY_CONSTANTS.DEFAULT_AUTH_TOKEN;

// List of allowed IP addresses for security filtering
const ALLOWED_IPS =
  ConfigManager.getSecurityConfig().allowedIps.length > 0
    ? ConfigManager.getSecurityConfig().allowedIps
    : [...SECURITY_CONSTANTS.DEFAULT_ALLOWED_IPS];

// Request interface for getting dialog messages
export interface DialogMessagesParams {
  dialogId: string;
}

export interface DialogMessagesQuery {
  limit?: string;
  offset?: string;
}

// Response interface for individual messages
export interface DialogMessage {
  id: number;
  createdAt: Date;
  question: string;
  answer: string;
}

// Response interface for the endpoint
export interface DialogMessagesResponse {
  success: boolean;
  dialogId: number;
  messages: DialogMessage[];
  totalCount: number;
  limit: number;
  offset: number;
}

/**
 * Controller for retrieving messages by dialog ID
 * Returns paginated list of messages with id, creation date, question, and answer
 */
export async function dialogMessagesController(fastify: FastifyInstance) {
  fastify.get<{
    Params: DialogMessagesParams;
    Querystring: DialogMessagesQuery;
  }>(
    '/api/dialog/:dialogId',
    async (
      request: FastifyRequest<{
        Params: DialogMessagesParams;
        Querystring: DialogMessagesQuery;
      }>,
      reply: FastifyReply,
    ) => {
      try {
        // === SECURITY CHECKS ===
        // Check for authorization token in header
        const authHeader = request.headers.authorization;
        if (
          !authHeader ||
          authHeader !== `${SECURITY_CONSTANTS.AUTH_HEADER_PREFIX}${AUTH_TOKEN}`
        ) {
          return reply
            .status(HTTP_STATUS_CODES.UNAUTHORIZED)
            .send({ error: ERROR_MESSAGES.UNAUTHORIZED });
        }

        // Check if IP address is allowed
        const clientIp = request.ip;
        if (!ALLOWED_IPS.includes(clientIp)) {
          Logger.logInfo('Blocked request from unauthorized IP', {
            clientIp,
            allowedIps: ALLOWED_IPS,
          });
          return reply
            .status(HTTP_STATUS_CODES.FORBIDDEN)
            .send({ error: ERROR_MESSAGES.FORBIDDEN_IP });
        }

        // === INPUT VALIDATION ===
        const dialogId = parseInt(request.params.dialogId as string);
        if (isNaN(dialogId) || dialogId <= 0) {
          return reply
            .status(HTTP_STATUS_CODES.BAD_REQUEST)
            .send({ error: 'Invalid dialog ID' });
        }

        const limit = request.query.limit
          ? Math.min(parseInt(request.query.limit.toString()), 100)
          : 50;
        const offset = request.query.offset
          ? Math.max(parseInt(request.query.offset.toString()), 0)
          : 0;

        if (isNaN(limit) || limit <= 0 || isNaN(offset) || offset < 0) {
          return reply
            .status(HTTP_STATUS_CODES.BAD_REQUEST)
            .send({ error: 'Invalid limit or offset parameters' });
        }

        Logger.logInfo('Fetching dialog messages', {
          dialogId,
          limit,
          offset,
        });

        // === DATABASE QUERIES ===
        // First get total count of messages for this dialog
        const countQuery = `
        SELECT COUNT(*) as total_count
        FROM new_chat_history
        WHERE dialog_id = $1
          AND ignored = false
      `;

        const countResult = await Database.getInstance().query(countQuery, [
          dialogId,
        ]);
        const totalCount = parseInt(countResult.rows[0].total_count);

        // Then get the paginated messages
        const messagesQuery = `
        SELECT 
          id,
          created_at as "createdAt",
          question,
          answer
        FROM new_chat_history
        WHERE dialog_id = $1
          AND ignored = false
        ORDER BY created_at ASC
        LIMIT $2 OFFSET $3
      `;

        const messagesResult = await Database.getInstance().query(
          messagesQuery,
          [dialogId, limit, offset],
        );

        const messages: DialogMessage[] = messagesResult.rows.map(
          (row: any) => ({
            id: row.id,
            createdAt: row.createdAt,
            question: row.question,
            answer: row.answer,
          }),
        );

        Logger.logInfo('Dialog messages retrieved successfully', {
          dialogId,
          messageCount: messages.length,
          totalCount,
        });

        const response: DialogMessagesResponse = {
          success: true,
          dialogId,
          messages,
          totalCount,
          limit,
          offset,
        };

        return reply.status(HTTP_STATUS_CODES.OK).send(response);
      } catch (error: any) {
        Logger.logError('Error fetching dialog messages', {
          error: error.message,
          dialogId: request.params.dialogId,
        });

        return reply.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({
          error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
          details: error.message,
        });
      }
    },
  );
}
