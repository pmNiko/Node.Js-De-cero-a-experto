
// write a new sleep Promise
const sleep = (time) =>
    new Promise(resolve => setTimeout(resolve, time))

const testFunction = async () => {
    console.log('Inicio ')

    await sleep(4000)

    console.log('Ha finalizado')

}


testFunction()
