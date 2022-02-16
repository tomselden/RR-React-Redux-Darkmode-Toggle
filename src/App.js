import "./App.css";
import { useSelector, useDispatch, connect } from "react-redux";
import {
  clearData,
  fetchData,
  incrementId,
  decrementId,
  inputId,
} from "./features/dataSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);

  const renderImg = () => {
    if (data.apiData) {
      return (
        <img
          style={{ width: "100vw" }}
          src={data.apiData.primaryImage}
          alt={data.apiData.title}
        />
      );
    } else {
      return <p>image here</p>;
    }
  };

  // this was erroring when it was props.objectId(error: props is undefined) but it works now that it is data.objectId 
  useEffect(() => {
    dispatch(fetchData());
  }, [data.objectId, dispatch]);

  return (
    <div className="App">
      <div>
        <button onClick={() => dispatch(fetchData())}>Thunk!</button>
        <button onClick={() => dispatch(clearData())}>Clear</button>
        <button onClick={() => dispatch(incrementId())}>Next</button>
        <button onClick={() => dispatch(decrementId())}>Back</button>
      </div>
      <input onChange={(e) => dispatch(inputId())} />
      <div>
        {data.objectId}
        {renderImg()}
      </div>
    </div>
  );
}

// passing state in for Connect, this method is called mapping state to props
const mapStateToProps = (state) => ({
  objectId: state.data.objectId,
});

export default connect(mapStateToProps)(App);
