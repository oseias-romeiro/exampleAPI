
function closeAlerts() {
    let alerts = document.getElementsByClassName('alert')
    for (let i=0; i<alerts.length; i++) {
        alerts[i].remove()
    }
}
