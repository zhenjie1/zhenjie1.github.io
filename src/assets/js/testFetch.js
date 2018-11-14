// var url = 'http://t.tjh.homebank.shop:8080/jeesite//article/findPage'
// var cs = {
//     pageNo: 1,
//     pageSize: 10,
//     state: 1
// }
// var options = {
//     method: "post",
//     body: JSON.stringify(cs),
//     headers: {
//         'credentials': 'include',
//         'user-agent': 'Mozilla/4.0 MDN Example',
//         'content-type': 'application/json'
//     }
// }
// // fetch(url, options).then(res => {
// //     console.log(res)
// // })
// //     .catch(e => {
// //         console.log(e)
// //     })

// requestData(url, cs)
//     .then(data => console.log(data)) // JSON from `response.json()` call


// function requestData(url = '', data = {}, method = 'POST') {
//     // Default options are marked with *
//     if (!(data instanceof Object) || JSON.stringify(data) == "{}") data = {}

//     let formData = new FormData();
//     for( let i in data){
//         formData.append(i, data[i])
//     }

//     return fetch(url, {
//         body: JSON.stringify(data), // must match 'Content-Type' header
//         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: 'include', // include, same-origin, *omit
//         headers: {
//             'user-agent': 'Mozilla/4.0 MDN Example',
//             'content-type': 'application/json'
//         },
//         method, // *GET, POST, PUT, DELETE, etc.
//         mode: 'cors', // no-cors, cors, *same-origin
//         redirect: 'follow', // manual, *follow, error
//         referrer: 'no-referrer', // *client, no-referrer
//     })
//         .then(response => response.json()) // parses response to JSON
//         .catch(error => console.error(error))
// }


const actions = () => {
  const functionA = () => { /*do sth*/ }
  const functionB = () => { /*do sth*/ }
  return new Map([
    [{
      identity: 'guest',
      status: 1
    }, functionA],
    [{
      identity: 'guest',
      status: 2
    }, functionA],
    [{
      identity: 'guest',
      status: 3
    }, functionA],
    [{
      identity: 'guest',
      status: 4
    }, functionA],
    [{
      identity: 'guest',
      status: 5
    }, functionB]
  ])
}



const onButtonClick = (identity, status) => {
  let action = [...actions()].filter(([key, value]) => (key.identity == identity && key.status == status))
  action.forEach(([key, value]) => value.call(this))
}