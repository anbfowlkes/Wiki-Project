// fetch('https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/2022/07/10')
//     .then((res) => {
//         return res.json()
//     })
//     .then((data) => {
//         console.log(data)
//     })

let titleProcessor = (str) => {
    let arr = str.split('')
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "_") {
            arr[i] = " "
        }
    }
    let newStr = ""
    for (let i = 0; i < arr.length; i++) {
        newStr += arr[i]
    }
    return newStr
}

let form = document.querySelector('#form')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    //getting the input from the user
    let month = document.querySelector('#month').value
    let day = document.querySelector('#day').value
    let year = document.querySelector('#year').value

    //testing whether or not the day is entered correctly
    if (!(/\d\d/.test(month))) {
        alert('Error, please enter your month as two digits.')
        return
    }
    if (!(/\d\d/.test(day))) {
        alert('Error, please enter your day as two digits.')
        return
    }
    if (!(/\d\d\d\d/.test(year))) {
        alert('Error, please enter your year correctly.')
        return
    }

    console.log(month, day, year)
    fetch(`https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${year}/${month}/${day}`)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        console.log(data)

        let artArr = data.items[0].articles
    
        //removing unwanted values
        //its important to iterate backwards so slicing
        //does not affect the other values
        console.log(artArr[0].article)
        for (let i = 15; i >= 0; i--) {
            if (
            artArr[i].article == "Main_Page" ||
            artArr[i].article == "Special:Search" ||
            artArr[i].article == "404.php"
            ) {
                artArr.splice(i,1)
            }
        }
        // console.log(location1, location2, location3)
        // artArr.splice(location3, 1)
        // artArr.splice(location2, 1)
        // // artArr.splice(location1, 1)
        // console.log(artArr)


        let first = data.items[0].articles[0]
        let second = data.items[0].articles[1]
        let third = data.items[0].articles[2]
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

        //getting the page info locations
        let p1 = document.querySelector('#p1')
        let p2 = document.querySelector('#p2')
        let p3 = document.querySelector('#p3')

        //titleProcessor removes the _'s from the data's titles
        //and replaces them with spaces
        p1.innerText = `${titleProcessor(first.article)}
                      Views: ${first.views}`
        p2.innerText = `${titleProcessor(second.article)}
                      Views: ${second.views}`
        p3.innerText = `${titleProcessor(third.article)}
                      Views: ${third.views}`

        let h2 = document.querySelector('#events')
        h2.innerText = "What happened on these days?"
        let link1 = document.querySelector('#link1')
        let link2 = document.querySelector('#link2')
        let link3 = document.querySelector('#link3')
        
        let linkMaker = (str) => {
            let theMonth = month.split('')
            console.log('testing')
            if (theMonth[0] == "0") {
                console.log('yes it is')
            }
            let arr = str.split(' ')
            let newStr = `${arr[0]}`
            if (arr.length > 1) {
                for (let i = 1; i < arr.length; i++) {
                    newStr += `+${arr[i]}`
                }
            }
            return `https://www.google.com/search?q=${newStr}`
        }
        console.log(linkMaker(titleProcessor(first.article)))
    })

})

