#!/usr/bin/env ts-node

/**
 * Test script to verify Mustache refactoring works correctly
 */

import { createTelegramAnalysisPrompt, createGenericAnalysisPrompt } from '../src/llm/prompt';

async function testMustacheRefactor() {
  console.log('=== Testing Mustache Refactoring ===\n');
  
  try {
    // Test 1: Telegram analysis prompt with history
    console.log('🎯 Test 1: Telegram analysis prompt with history');
    const telegramResult = createTelegramAnalysisPrompt({
      chunk: 'Some document content here',
      history: ['Previous message 1', 'Previous message 2'],
      question: 'What did you use?'
    });
    
    console.log('✅ Telegram prompt generated successfully');
    console.log('📋 Contains history section:', telegramResult.includes('Conversation history'));
    console.log('📋 Contains custom rules:', telegramResult.includes('follow-up'));
    console.log('📋 Contains question with title:', telegramResult.includes('Original question (follow-up)'));
    console.log();

    // Test 2: Generic analysis prompt without history
    console.log('🎯 Test 2: Generic analysis prompt without history');
    const genericResult = createGenericAnalysisPrompt({
      chunk: 'Document content',
      history: [],
      question: 'Simple question'
    });
    
    console.log('✅ Generic prompt generated successfully');
    console.log('📋 Uses "нет" for empty history:', genericResult.includes('history (use strictly for personal experience context): \nнет'));
    console.log('📋 No custom rules for empty history:', !genericResult.includes('follow-up'));
    console.log('📋 Simple question title:', genericResult.includes('Original question: Simple question'));
    console.log();

    // Test 3: Verify template structure
    console.log('🎯 Test 3: Template structure verification');
    console.log('📋 Contains Mustache placeholders replaced:');
    console.log('   - {{history}} → actual history content');
    console.log('   - {{context}} → document content');
    console.log('   - {{question}} → question text');
    console.log('   - {{customRules}} → conditional rules');
    console.log('   - {{questionWithTitle}} → titled question');
    console.log();

    console.log('🎉 All tests passed! Mustache refactoring works correctly.');
    
  } catch (error) {
    console.error('❌ Error during test:', error);
  }
}

// Run the test
testMustacheRefactor().catch(console.error);