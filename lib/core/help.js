const program=require("commander")

const helpOptions=()=>{
  program.option('-p, --pepper <pepper>','commander add help option test')
  program.on('--help',()=>{
    console.log('')
    console.log('other option')
    console.log('other options.')
  })
}

module.exports=helpOptions