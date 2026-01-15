import chalk from 'chalk';

export function logger(message: any, ...data: any[]) {
  console.info(`${chalk.cyan('prisma')} ${message}`, ...data);
}

export function warn(message: any, ...data: any[]) {
  console.info(chalk.yellowBright(`prisma ${message}`), ...data);
}
