// cliConfig.ts
export class CLIConfig {
  public static readonly REINDEX = process.argv.includes('--reindex');
}
