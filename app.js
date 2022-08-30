
function useTrait(initialValue) {
  const [trait, updateTrait] = React.useState(initialValue);

  let current = trait;

  const get = () => current;

  const set = newValue => {
     current = newValue;
     updateTrait(newValue);
     return current;
  }

  return {
     get,
     set,
  }
}

const App = () => {

  const expression = useTrait("0")
  const answer = useTrait(0)
  const allowZeros = useTrait(0)
  const allowPoint = useTrait(1)

  const disp = (symbol) => {
    expression.set((prev=expression.get()) => {
      let newVal
      if(/[+*-/]/.test(symbol) && /[+*-/]/.test(prev[prev.length-1])) {
        if(/[-]/.test(symbol)) newVal = prev + symbol
        else {
          let cnt = 0
          for(let i=prev.length-1; i>=0; i--){
            if(/[+*-/]/.test(prev[i])) cnt++
            else break
          }
          newVal = prev.slice(0,prev.length-cnt) + symbol
        }
      }else if(symbol === "0") {
        if(allowZeros.get() === 0) newVal = prev
        else if(allowZeros.get() === 1) {
          newVal = prev + symbol
          allowZeros.set(0)
        }else newVal = prev + symbol
      }else if(symbol === "."){
        if(allowPoint.get() === 1){
          newVal = prev + symbol
          allowPoint.set(0)
          allowZeros.set(2)
        }else newVal = prev 
      }else {
        if(allowZeros.get() === 0 && /[1-9]/.test(symbol)) {
          newVal = prev.slice(0,-1) + symbol
          allowZeros.set(2)
        }else {
          if(/[+*-/]/.test(symbol)) {
            allowZeros.set(1)
            allowPoint.set(1)
          }else allowZeros.set(2)
          newVal = (prev + symbol)
        }
      }
      return newVal
    })
  }

  const allClear = () => {
    allowZeros.set(0)
    allowPoint.set(1)
    expression.set("0")
    answer.set(0)
  }

  const calculate = () => {
    let res = eval(expression.get())
    answer.set(res)
    expression.set((res).toString())
    if(res === 0) allowZeros.set(0)
    else allowZeros.set(2)
    if(Number.isInteger(res)) allowPoint.set(1)
    else allowPoint.set(0)
  }

  return (
    <div className="container-fluid justify-content-center">
      <div className="grid justify-content-center mt-5">
        <div id="display-box">
          <input id="display" type="text" className="exp text-white border-0 col-12 text-end h4" style={{backgroundColor: 'black'}}value={expression.get()} placeholder="0" disabled />
          <input type="text" className="ans text-info border-0 col-12 text-end h2" style={{backgroundColor: 'black'}}value={answer.get()} disabled />
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