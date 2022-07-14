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
    m = m.toString()
    d = d.toString()
    y = y.toString()
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

let numDisplayer = (number) => {
    let numArr = number.split('')
    let len = numArr.length
    for (pos = numArr.length; pos > 0; pos--) {
        if ((len - pos) % 3 == 0 && len - pos != 0) {
            numArr.splice(pos, 0, ',')
        }
    }
    let numWithCommas = ""
    for (let i = 0; i < numArr.length; i++) {
        numWithCommas += numArr[i]
    }
    return numWithCommas
}

let dayVerifier = (month, day, year) => {
    //testing whether or not the day is entered correctly
    let todaysDate = new Date()
    let todaysDay = todaysDate.getDate()
    let todaysMonth = todaysDate.getMonth() + 1
    let todaysYear = todaysDate.getFullYear()
    if (!(/\d\d/.test(month))) {
        alert('Error, please enter your month as two digits.')
        return false
    }
    if (!(/\d\d/.test(day))) {
        alert('Error, please enter your day as two digits.')
        return false
    }
    if (!(/\d\d\d\d/.test(year))) {
        alert('Error, please enter your year as four digits.')
        return false
    }
    if (year < 2015) {
        alert('Error, please enter a day after 07/01/2015.')
        return false
    }
    //only a ==, otherwise it wouldn't work
    //I'm doing this instead of converting data types
    if (month == 1 || month == 3 || month == 5 || month == 7 ||
        month == 8 || month == 10 || month == 12) {
        if (day > 31) {
            alert('Error, please enter a valid day.')
            return false
        }
    }
    if (month == 4 || month == 6 || month == 9 || month == 11) {
        if (day > 30) {
            alert('Error, please enter a valid day.')
            return false
        }
    }
    if (month == 2) {
        if (year % 4 == 0) {
            if (day > 29) {
                alert('Error, please enter a valid day.')
                return false
            }
        }
        else if (day > 28) {
            alert('Error, please enter a valid day.')
            return false
        }
    }
    if (month > 12) {
        alert('Error, please enter a valid month.')
        return false
    }

    if (year == 2015) {
        if (month < 7) {
            alert('Errer, please enter a day after 07/01/2015')
            return false
        }
    }
    if (year > todaysYear) {
        alert('Error, please do not enter a future date.')
        return false
    }
    if (year == todaysYear) {
        if (month > todaysMonth) {
            alert('Error, please do not enter a future date.')
            return false
        }
        if (month == todaysMonth) {
            if (day >= todaysDay) {
                alert('Error, please do not enter a future or current date.')
                return false
            }
        }
    }
}
let month
let day
let year
let cardContainer = document.querySelector('#cardContainer')

let cardCreator = (num, data) => {
    let newDiv = document.createElement('div')
    let leftDiv = document.createElement('div')
    let rightDiv = document.createElement('div')
    let wikiTitle = document.createElement('p')
    let wikiViews = document.createElement('p')
    let wikiHL = document.createElement('p')
    let aTag = document.createElement('a')
    let daySearch = document.createElement('p')
    let topicalLink = (linkMaker(titleProcessor(data[num].article),
        document.querySelector('#month').value,
        document.querySelector('#day').value,
        document.querySelector('#year').value))
    wikiTitle.innerText = titleProcessor(data[num].article)
    wikiTitle.setAttribute('id', 'wikiTitle')
    wikiViews.innerText = `Views: ${numDisplayer(data[num].views.toString())}`
    wikiViews.setAttribute('id', 'wikiViews')
    aTag.innerText = 'Wikipedia Link'
    aTag.setAttribute('href', `https://en.wikipedia.org/wiki/${titleProcessor(data[num].article)}`)
    aTag.setAttribute('target', '_blank')
    wikiHL.append(aTag)
    wikiHL.setAttribute('id', 'wikiHL')
    topicalTag = document.createElement('a')
    topicalTag.innerText = "What's Happening"
    topicalTag.setAttribute('href', topicalLink)
    topicalTag.setAttribute('target', '_blank')
    daySearch.append(topicalTag)
    daySearch.setAttribute('id', 'daySearch')
    newDiv.setAttribute('id', 'newDiv')
    leftDiv.setAttribute('id', 'leftDiv')
    rightDiv.setAttribute('id', 'rightDiv')
    newDiv.append(leftDiv)
    newDiv.append(rightDiv)
    cardContainer.append(newDiv)

    leftDiv.append(wikiTitle)
    leftDiv.append(wikiViews)
    rightDiv.append(daySearch)
    rightDiv.append(wikiHL)
    console.log(wikiHL)
    console.log(aTag)

}

let postDate = (month, day, year) => {
    let dataObj = {
        day: day,
        month: month,
        year: year
    }
    let configObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(dataObj)
    }
    fetch('http://localhost:3000/date', configObj)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            return
        })
}

// let getImage = (url, params)
let runCount = 0
let form = document.querySelector('#form')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    //getting the input from the user
    let month = document.querySelector('#month').value
    let day = document.querySelector('#day').value
    let year = document.querySelector('#year').value

    let h1 = document.querySelector('#h1')

    if (dayVerifier(month, day, year) === false) {
        return
    }
    h1.style.marginTop = '20px';

    // postDate(month, day, year)


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
                    artArr.splice(i, 1)
                }
            }

            let first = data.items[0].articles[0]
            let second = data.items[0].articles[1]
            let third = data.items[0].articles[2]
            let firstCount = first.views
            let secondCount = second.views
            let thirdCount = third.views

            let ceiling
            let graphHeight
            let firstBar
            let secondBar
            let thirdBar

            //calculations
            if (firstCount < 250000) {
                ceiling = 250000
            } else if (firstCount < 500000) {
                ceiling = 500000
            } else if (firstCount < 750000) {
                ceiling = 750000
            } else {
                let x = Math.floor(firstCount * 1.1)
                x = x.toString()
                xArr = x.split('')
                for (let i = xArr.length - 1; i > 1; i--) {
                    xArr[i] = '0'
                }
                let newNum = ''
                for (let i = 0; i < xArr.length; i++) {
                    newNum += xArr[i]
                }
                ceiling = parseInt(newNum)
            }
            console.log(ceiling)
            if (ceiling <= 750000) {
                graphHeight = ceiling * (1 / 2000)
                firstBar = firstCount * (1 / 2000)
                secondBar = secondCount * (1 / 2000)
                thirdBar = thirdCount * (1 / 2000)
            } else {
                graphHeight = 350
                firstBar = (firstCount / ceiling) * 350
                secondBar = (secondCount / ceiling) * 350
                thirdBar = (thirdCount / ceiling) * 350
            }
            console.log(graphHeight)
            let display = document.querySelector('#display')
            let scale = document.querySelector('#scale')
            display.style.height = `${graphHeight}px`
            display.style.width = `700px`
            scale.style.height = `${graphHeight}px`
            scale.style.width = `2px`

            // let firstBar = firstCount * (1 / 2000)
            // let secondBar = secondCount * (1 / 2000)
            // let thirdBar = thirdCount * (1 / 2000)

            let label1 = document.querySelector('#label1')
            let label2 = document.querySelector('#label2')
            let label3 = document.querySelector('#label3')
            let axisLabel1 = document.querySelector('#axisLabel1')
            let axisLabel2 = document.querySelector('#axisLabel2')
            let axisLabel3 = document.querySelector('#axisLabel3')
            let info1 = document.querySelector('#info1')
            let info2 = document.querySelector('#info2')
            let info3 = document.querySelector('#info3')

            let bar1 = document.querySelector('#bar1')
            let bar2 = document.querySelector('#bar2')
            let bar3 = document.querySelector('#bar3')
            bar1.style.height = `${firstBar}px`
            bar2.style.height = `${secondBar}px`
            bar3.style.height = `${thirdBar}px`
            label1.style.bottom = `${graphHeight - 5}px`
            label2.style.bottom = `${(graphHeight / 2) - 5}px`
            label3.style.bottom = '-5px'
            axisLabel1.innerText = `${numDisplayer(ceiling.toString())}`
            axisLabel2.innerText = `${numDisplayer((ceiling / 2).toString())}`
            axisLabel3.innerText = `0`
            info1.style.width = '200px'
            info1.style.height = '50px'
            info2.style.width = '200px'
            info2.style.height = '50px'
            info3.style.width = '200px'
            info3.style.height = '50px'
            info1.style.bottom = `${firstBar + 20}px`
            info2.style.bottom = `${secondBar + 20}px`
            info3.style.bottom = `${thirdBar + 20}px`
            if (graphHeight - firstBar < 20) {
                display.style.paddingTop = '80px'
            } else if (graphHeight - firstBar < 50) {
                display.style.paddingTop = '50px'
            } else {
                display.style.paddingTop = '25px'
            }

            //getting the page info locations
            let p1 = document.querySelector('#p1')
            let p2 = document.querySelector('#p2')
            let p3 = document.querySelector('#p3')


            //titleProcessor removes the _'s from the data's titles
            //and replaces them with spaces
            p1.innerText = `${titleProcessor(first.article)}
                      Views: ${numDisplayer(first.views.toString())}`
            p2.innerText = `${titleProcessor(second.article)}
                      Views: ${numDisplayer(second.views.toString())}`
            p3.innerText = `${titleProcessor(third.article)}
                      Views: ${numDisplayer(third.views.toString())}`

            let h2 = document.querySelector('#events')
            h2.innerText = "What happened on this day?"

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

            let n = 0
            let btnDiv
            let btn
            let btnCount = 0
            let btnForMore
            let btnForMoreDiv = document.querySelector('#btnForMoreDiv')
            if (runCount == 0) {
                btnDiv = document.querySelector('#btnDiv')
                btn = document.createElement('button')
                btn.setAttribute('id', 'cardButton')
                btn.innerText = "Click here to see more"
                btnDiv.append(btn)
                n = 0
                runCount++
            }
            btn.addEventListener('click', (e) => {
                for (n; n < 10; n++) {
                    cardCreator(n, artArr)
                }
                if (btnCount === 0) {
                    console.log('hello, its at zero here')
                    btnForMore = document.createElement('button')
                    btnForMore.innerText = 'Click to see 10 more'
                    btnForMore.setAttribute('id', 'btnForMore')
                    btnForMoreDiv.append(btnForMore)
                    console.log('here comes the btncount')
                    btnCount++
                    console.log(btnCount)
                }
                btnForMore.addEventListener('click', (e) => {
                    let k = n + 10
                    for (n; n < k; n++) {
                        cardCreator(n, artArr)
                    }
                    console.log(n)
                }
                )
            })
        })
})

// let url = 'https://en.wikipedia.org/w/api.php'

// let params = {
//     action: "query",
//     prop: "images",
//     titles: "Usain Bolt",
//     format: "json"
// }

// url += "?origin=*"

// Object.keys(params).forEach((key) => {
//     {url += "&" + key + "=" + params[key]}
// })

// fetch(url)
//     .then((res) => res.json())
//     .then((data) => {
//         let pages = data.query.pages
        // console.log(pages)
        // for (let page in pages) {
        //     for (let img of pages[page].images) {
        //         console.log(img.title)
        //     }
        // }
    // })
//source: https://www.mediawiki.org/wiki/API:Images#JavaScript