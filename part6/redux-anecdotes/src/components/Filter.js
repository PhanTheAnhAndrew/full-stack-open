import React from 'react'
import { connect } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

function Filter(props) {
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter: <input onChange={(evt) => props.setFilter(evt.target.value)} value={props.filter} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  filter: state.filter,
});

const mapDispatchToProps = {
  setFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
