
async function preencher() {
    await fetch('/userinfo', {
        method: 'GET',
        credentials: "include"
    }).then(data => data.json())
        .then(data => {
            const username = data.username

            document.getElementById('divOla').innerHTML = `<strong>Hello ${username}!</strong>`
        })
}

window.onload = preencher()