$.ajax({
    url: 'http://localhost:3003/api/detail',
    method: 'post',
    data: JSON.stringify({
        a: 'a',
        b: 'b'
    })
}).then((res) => {

}).catch((error) => {

})

fetch('http://localhost:3003/api/detail').then(() => {

})