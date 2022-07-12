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

let linkMaker = (title, m, d, y) => {
    if (m.substring(0, 1) === "0") {
        m = m.substring(1)
    }
    if (d.substring(0, 1) === "0") {
        d = d.substring(1)
    }
    let arr = title.split(' ')
    let search = `${m}/${d}/${y}+${arr[0]}`
    if (arr.length > 1) {
        for (let i = 1; i < arr.length; i++) {
            search += `+${arr[i]}`
        }
    }
    return `https://www.google.com/search?q=${search}`
}

// let getImage = (url, params)

let form = document.querySelector('#form')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    //getting the input from the user
    let month = document.querySelector('#month').value
    let day = document.querySelector('#day').value
    let year = document.querySelector('#year').value

    let todaysDate = new Date()
    let todaysDay = todaysDate.getDate()
    let todaysMonth = todaysDate.getMonth() + 1
    let todaysYear = todaysDate.getFullYear()
    console.log("Today Is", todaysDay, todaysMonth, todaysYear)

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
        alert('Error, please enter your year as four digits.')
        return
    }
    if (year < 2015) {
        alert('Error, please enter a day after 07/01/2015.')
        return
    }
    //only a ==, otherwise it wouldn't work
    //I'm doing this instead of converting data types
    if (month == 1 || month == 3 || month == 5 || month == 7 ||
        month == 8 || month == 10 || month == 12) {
            if (day > 31) {
                alert('Error, please enter a valid day.')
                return
            }
        }
    if (month == 4 || month == 6 || month == 9 || month == 11) {
        if (day > 30) {
            alert('Error, please enter a valid day.')
            return
        }
    }
    if (month == 2) {
        if (year % 4 == 0) {
            if (day > 29) {
                alert('Error, please enter a valid day.')
                return
            }
        }
        else if (day > 28) {
            alert('Error, please enter a valid day.')
            return
        }
    }
    if (month > 12) {
        alert('Error, please enter a valid month.')
        return
    }

    if (year == 2015) {
        if (month < 7) {
            alert('Errer, please enter a day after 07/01/2015')
            return
        }
    }
    console.log(todaysMonth)
    if (year > todaysYear) {
        alert('Error, please do not enter a future date.')
        return
    }
    if (year == todaysYear) {
        if (month > todaysMonth) {
            alert('Error, please do not enter a future date.')
            return
        }
        if (month == todaysMonth) {
            if (day >= todaysDay) {
                alert('Error, please do not enter a future or current date.')
                return
            }
        }
    }

    //fetching the data
    fetch(`https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${year}/${month}/${day}`)
    .then((res) => {
        return res.json()
    })
    .then((data) => {

        //extracting the array of wikipedia pages
        //there's 1000 of them, each with a title,
        //a view count, and a rank
        //they are presorted by view count
        let artArr = data.items[0].articles
    
        //removing unwanted values
        //its important to iterate backwards so slicing
        //does not affect the other values
        console.log(artArr[0].article)
        for (let i = 100; i >= 0; i--) {
            if (
            artArr[i].article == "Main_Page" ||
            artArr[i].article == "Special:Search" ||
            artArr[i].article == "Special:CreateAccount" ||
            artArr[i].article == "Special:Watchlist" ||
            artArr[i].article == "Special:LinkSearch" ||
            artArr[i].article == "Special:MobileMenu" ||
            artArr[i].article == "Portal:Current_events" ||
            artArr[i].article == "Special:CiteThisPage" ||
            artArr[i].article == "Special:Book" ||
            artArr[i].article == "404.php" ||
            artArr[i].article == "Wikipedia:Contact_us" ||
            artArr[i].article == "AMGTV"
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


        //calculations
        let topThreeTotal = firstCount + secondCount + thirdCount
        let ceiling
        if (firstCount < 250000) {
            ceiling = 250000
        } else if (firstCount < 500000) {
            ceiling = 500000
        } else if (firstCount < 750000) {
            ceiling = 750000
        } else if (firstCount < 1000000) {
            ceiling = 1000000
        } else {
            ceiling = firstCount * 1.1
        }

        let graphHeight = ceiling * (1/2000)
        console.log(graphHeight)
        let display = document.querySelector('#display')
        let scale = document.querySelector('#scale')
        display.style.height = `${graphHeight}px`
        scale.style.height = `${graphHeight}px`
        scale.style.width = `2px`

        let firstBar = firstCount * (1/2000)
        let secondBar = secondCount * (1/2000)
        let thirdBar = thirdCount * (1/2000)

        // let firstRatio = (firstCount/topThreeTotal) * 100
        // let secondRatio = (secondCount/topThreeTotal) * 100
        // let thirdRatio = (thirdCount/topThreeTotal) * 100
    
        let bar1 = document.querySelector('#bar1')
        let bar2 = document.querySelector('#bar2')
        let bar3 = document.querySelector('#bar3')
        bar1.style.height = `${firstBar}px`
        bar2.style.height = `${secondBar}px`
        bar3.style.height = `${thirdBar}px`

        //START HERE
        // let label1 = document.querySelector('#label1')
        // let label2 = document.querySelector('#label2')
        // let label3 = document.querySelector('#label3')
        // let midHeight = graphHeight/2;
        // label1.style.height = `${graphHeight}px`
        // label2.style.height = `${midHeight}px`
        // label3.style.height = `$0px`

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

        //creating the links to the google searches of these
        //topics on their relevant day
        let link1 = document.querySelector('#link1')
        let link2 = document.querySelector('#link2')
        let link3 = document.querySelector('#link3')
        let hl1 = document.querySelector('#hl1')
        let hl2 = document.querySelector('#hl2')
        let hl3 = document.querySelector('#hl3')
        link1.innerText = `See what's happening with ${titleProcessor(first.article)}`
        link2.innerText = `See what's happening with ${titleProcessor(second.article)}`
        link3.innerText = `See what's happening with ${titleProcessor(third.article)}`
        hl1.setAttribute('href', linkMaker(titleProcessor(first.article), month, day, year))
        hl1.setAttribute('target', '_blank')
        hl2.setAttribute('href', linkMaker(titleProcessor(second.article), month, day, year))
        hl2.setAttribute('target', '_blank')
        hl3.setAttribute('href', linkMaker(titleProcessor(third.article), month, day, year))
        hl3.setAttribute('target', '_blank')
        
        let wiki1 = document.querySelector('#wiki1')
        let wiki2 = document.querySelector('#wiki2')
        let wiki3 = document.querySelector('#wiki3')
        wiki1.innerText = `View ${titleProcessor(first.article)}'s Wikipedia page here`
        wiki2.innerText = `View ${titleProcessor(second.article)}'s Wikipedia page here`
        wiki3.innerText = `View ${titleProcessor(third.article)}'s Wikipedia page here`
        let wikilink1 = document.querySelector('#wikilink1')
        let wikilink2 = document.querySelector('#wikilink2')
        let wikilink3 = document.querySelector('#wikilink3')
        wikilink1.setAttribute('href', `https://en.wikipedia.org/wiki/${first.article}`)
        wikilink1.setAttribute('target', '_blank')
        wikilink2.setAttribute('href', `https://en.wikipedia.org/wiki/${second.article}`)
        wikilink2.setAttribute('target', '_blank')
        wikilink3.setAttribute('href', `https://en.wikipedia.org/wiki/${third.article}`)
        wikilink3.setAttribute('target', '_blank')
        
    })

})

let url = 'https://en.wikipedia.org/w/api.php'

let params = {
    action: "query",
    prop: "images",
    titles: "Usain Bolt",
    format: "json"
}

url += "?origin=*"

Object.keys(params).forEach((key) => {
    {url += "&" + key + "=" + params[key]}
})

fetch(url)
    .then((res) => res.json())
    .then((data) => {
        let pages = data.query.pages
        console.log(pages)
        // for (let page in pages) {
        //     for (let img of pages[page].images) {
        //         console.log(img.title)
        //     }
        // }
    })
//source: https://www.mediawiki.org/wiki/API:Images#JavaScript