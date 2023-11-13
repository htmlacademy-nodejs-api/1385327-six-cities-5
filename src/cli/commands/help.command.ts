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

        ${chalk.gray('--version:')}                                                             ${chalk.gray('# выводит номер версии из файла package.json')}
        ${chalk.green('--help:')}                                                               ${chalk.green('# печатает этот текст')}
        ${chalk.yellow('--import <path> <username> <password> <host> <databaseName> <salt>')}   ${chalk.yellow('# импортирует данные из файла формата TSV в базу данных')}
        ${chalk.magenta('--generate <n> <path> <url>')}                                         ${chalk.magenta('# генерирует <n> количество тестовых данных в файл формата TSV')}
    `);
  }
}
