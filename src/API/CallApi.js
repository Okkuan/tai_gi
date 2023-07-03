export default function CallApi (props,Fn,Fn2,id) {
    fetch('https://8e0a-2001-b400-e248-4114-f0b4-73b8-f56f-a835.ngrok-free.app/' + props + (id? id:''),{})
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