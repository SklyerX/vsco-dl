import chalk from "chalk";

function error(...options: any) {
  console.log(`${chalk.red("[")}-${chalk.red("]")}`, ...options);
}

function info(...options: any) {
  console.log(
    `${chalk.blueBright("[")} ? ${chalk.blueBright("]")}`,
    ...options
  );
}

function success(...options: any) {
  console.log(
    `${chalk.greenBright("[")} + ${chalk.greenBright("]")}`,
    ...options
  );
}

export { error, info, success };
