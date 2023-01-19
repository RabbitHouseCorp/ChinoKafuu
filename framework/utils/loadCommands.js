import { clearLogCommand } from '../commands/clearLog.js'
import { devCommand } from '../commands/dev.js'
import { forceInstallCommand } from '../commands/forceInstall.js'
import { installPackageCommand } from '../commands/installPackage.js'
import { silentCommand } from '../commands/silent.js'
import { testCommand } from '../commands/testCommand.js'
import { typescriptCommand } from '../commands/typescript.js'
import { upgradePackagesCommand } from '../commands/upgradePackages.js'

export const loadListCommands = [
  typescriptCommand,
  clearLogCommand,
  devCommand,
  upgradePackagesCommand,
  installPackageCommand,
  forceInstallCommand,
  silentCommand,
  testCommand
]

