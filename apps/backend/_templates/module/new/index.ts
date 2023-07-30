module.exports = {
  prompt: ({ inquirer }: any) => {
    const questions = [
      {
        type: 'input',
        name: 'moduleName',
        message: 'What is the name of the module?'
      },
      {
        type: 'input',
        name: 'columnCount',
        message: 'How many columns do you want to add?',
        validate: (input: string) => {
          const num = parseInt(input)
          return Number.isInteger(num) && num >= 0 ? true : 'Please enter a non-negative integer.'
        }
      }
    ]

    return inquirer.prompt(questions).then(async (answers: any) => {
      const { moduleName, columnCount } = answers
      const path = moduleName
      const absPath = `src/${path}`

      const columns = []
      for (let i = 0; i < parseInt(columnCount); i++) {
        const { columnName } = await inquirer.prompt({
          type: 'input',
          name: 'columnName',
          message: `What is the name of column ${i + 1}? (in lowerCamelCase)`
        })
        columns.push(columnName)
      }

      return { ...answers, path, absPath, moduleName, columns }
    })
  }
}
