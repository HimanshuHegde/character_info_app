import '@/styles/login.css'
export default function signIn(){
    return(
        <>
            <div className="siContainer">
                <form>
                    <label htmlFor="email">Email</label>
                    <input id="email"type="email"/>
                    <label htmlFor="password">Password ( minimum of 8 character )</label>
                    <input id="password" type="password"/>
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    
    )
}