import { Command } from './commands.interface.js';
import chalk from 'chalk';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
    ${chalk.green('Программа для подготовки данных для REST API сервера.')}
        Пример:
            cli.js --<command> [--arguments]
        Команды:
        ${chalk.gray('--version:')}                   ${chalk.gray('# выводит номер версии')}
        ${chalk.green('--help:')}                      ${chalk.green('# печатает этот текст')}
        ${chalk.yellow('--import <path>:')}             ${chalk.yellow('# импортирует данные из TSV')}
        ${chalk.magenta('--generate <n> <path> <url>')}  ${chalk.magenta('# генерирует произвольное количество тестовых данных')}
    `);
  }
}
