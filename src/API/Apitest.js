export default function CallApi (props,Fn,Fn2,id) {
    fetch('https://b345-61-222-207-205.ngrok-free.app/' + props + (id? id:''),{})
    .then(response => {
        console.log(response)
        return response.json()
    })
    .then(data => {
        if(Fn){Fn(data)}
        if(Fn2){Fn2(data)}
    })
    .catch(error => {
        console.log(error)
    })
}