export default function CallApi (props,Fn,Fn2,id) {
    fetch('http://localhost:8080/' + props + (id? id:''),{})
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