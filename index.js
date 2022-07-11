// fetch('https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/2022/07/10')
//     .then((res) => {
//         return res.json()
//     })
//     .then((data) => {
//         console.log(data)
//     })

let form = document.querySelector('#form')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let month = document.querySelector('#month').value
    let day = document.querySelector('#day').value
    let year = document.querySelector('#year').value
    console.log(month, day, year)
    fetch(`https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${year}/${month}/${day}`)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        console.log(data)
        let first = data.items[0].articles[2]
        let second = data.items[0].articles[3]
        let third = data.items[0].articles[4]
        let firstCount = first.views
        let secondCount = second.views
        let thirdCount = third.views
        let topThreeTotal = firstCount + secondCount + thirdCount
        let firstRatio = (firstCount/topThreeTotal) * 100
        let secondRatio = (secondCount/topThreeTotal) * 100
        let thirdRatio = (thirdCount/topThreeTotal) * 100
        let bar1 = document.querySelector('#bar1')
        let bar2 = document.querySelector('#bar2')
        let bar3 = document.querySelector('#bar3')
        bar1.style.height = `${firstRatio}%`
        bar2.style.height = `${secondRatio}%`
        bar3.style.height = `${thirdRatio}%`


        console.log(data.items[0].articles[2])
    })

})