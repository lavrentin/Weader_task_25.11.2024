import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

export const Nav = styled.nav`
    background-color: purple;
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const SearchForm = styled.form`
    display: flex;
    align-items: center;
    
    input {
        width: 150px;
        height: 30px;
        margin: 10px 0;
        border: none;
        outline: none;
        padding: 5px;
        font-size: 16px;
    }
    
    button {
        height: 40px;
        margin: 10px 0;
        outline: none;
        padding: 5px;
        font-size: 16px;
        background-color: white;
        cursor: pointer;
        border: none;
        border-left: 1px solid black;
    }
`

export const TemperatureBlock = styled.div`
    display: flex;
    align-items: center;
    height: 40px;
    justify-content: center;
    border-radius: 5px;
    margin-left: 30%;
    border: 1px solid black;
    background-color: white;

    button {
        height: 20px;
        font-size: 16px;
        background-color: white;
        cursor: pointer;
        border: none;

        &:hover {
            color: rgba(171, 139, 11, 0.9);
        }
    }
`

export const Time = styled.div`
    display: flex;
    font-size: 20px;
    margin: 20px 30px;
    width: 50%;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    border: 1px solid purple;
    border-radius: 5px;

    .timeBlock {
        display: flex;
        color: purple;
        padding: 10px;
    }
`
export const Card = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    font-size: 20px;
    margin: 15% auto;
    flex-direction: row;
    width: 50%;
.infoCard{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;

}
`

export const DeyTemp = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    font-size: 20px;
    margin: 20px auto;
    flex-direction: row;
    
    div{
        border: 1px solid black;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor:pointer;
        margin: 0 10px;
        font-size: 16px;
    }
`
