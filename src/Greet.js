import styled from 'styled-components'

const Avatar = styled.p`
    background-color: green;
`
const Greet = ({ greet, alert }) => {
    return (
        <>
        
            <Avatar>Hello {greet}!!!</Avatar>
            
            <button onClick={() => alert('naina')} >Clice ME!! </button>
        </>
    )
}

export default Greet