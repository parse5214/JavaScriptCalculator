
const App = () => {

  const [expression, setExpression] = React.useState("")
  const [answer, setAnswer] = React.useState(0)
  const [allowZeros, setAllowZeros] = React.useState(1)

  const disp = (symbol) => {
    setExpression((prev) => {
      let newVal
      if(/[+*-/]/.test(symbol) && /[+*-/]/.test(prev[prev.length-1])) {
        if(/[-]/.test(symbol)) newVal = prev + symbol
        else newVal = prev.slice(0,-1) + symbol
      }else if(symbol === "0") {
        if(allowZeros === 0) newVal = prev
        else if(allowZeros === 1) {
          newVal = prev + symbol
          setAllowZeros(0)
        }else newVal = prev + symbol
      }else {
        let lastSymbol = prev[prev.length-1]

        if(allowZeros === 0 && /[1-9]/.test(symbol)) newVal = prev.slice(0,-1) + symbol
        else {
          if(/[+*-/]/.test(symbol)) setAllowZeros(1)
          else if(/[1-9.]/.test(symbol)) setAllowZeros(2)

          if(/\./.test(lastSymbol) && symbol === ".") symbol = ""

          newVal = (prev + symbol)
        }
      }
      return newVal
    })
  }

  const allClear = () => {
    setExpression("")
    setAnswer(0)
    setAllowZeros(1)
  }

  const calculate = () => {
    setAnswer(eval(expression))
    setExpression(eval(expression))
    if(answer === "0") setAllowZeros(0)
    else setAllowZeros(2)
  }

  return (
    <div className="container-fluid justify-content-center">
      <div className="grid justify-content-center mt-5">
        <div id="display">
          <input type="text" className="exp text-white border-0 col-12 text-end h4" style={{backgroundColor: 'black'}}value={expression} placeholder="0" disabled />
          <input type="text" className="ans text-info border-0 col-12 text-end h2" style={{backgroundColor: 'black'}}value={answer} disabled />
        </div>
        <div onClick={allClear} className="padButton bg-danger" id="clear">AC</div>
        <div onClick={() => disp("/")} className="padButton" id="divide">/</div>
        <div onClick={() => disp("*")} className="padButton" id="multiply">x</div>
        <div onClick={() => disp("7")} className="padButton bg-dark" id="seven">7</div>
        <div onClick={() => disp("8")} className="padButton bg-dark" id="eight">8</div>
        <div onClick={() => disp("9")} className="padButton bg-dark" id="nine">9</div>
        <div onClick={() => disp("-")} className="padButton " id="subtract">-</div>
        <div onClick={() => disp("4")} className="padButton bg-dark" id="four">4</div>
        <div onClick={() => disp("5")} className="padButton bg-dark" id="five">5</div>
        <div onClick={() => disp("6")} className="padButton bg-dark" id="six">6</div>
        <div onClick={() => disp("+")} className="padButton" id="add">+</div>
        <div onClick={() => disp("1")} className="padButton bg-dark" id="one">1</div>
        <div onClick={() => disp("2")} className="padButton bg-dark" id="two">2</div>
        <div onClick={() => disp("3")} className="padButton bg-dark" id="three">3</div>
        <div onClick={calculate} className="padButton bg-info" id="equals">=</div>
        <div onClick={() => disp("0")} className="padButton bg-dark" id="zero">0</div>
        <div onClick={() => disp(".")} className="padButton bg-dark" id="decimal">.</div>
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)