

const Greet = ({ greet, alert }) => {
    return (
        <>
            <h1>Hello {greet}!!!</h1>
            <button onClick={() => alert('naina')} >Clice ME!! </button>
        </>
    )
}
export default Greet