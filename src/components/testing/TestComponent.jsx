import React, { Component } from 'react'
import { connect } from 'react-redux'


const mapState = (state) => ({
  data: state.test.data
})

class TestComponent extends Component {
  render () {
    return (
      <div>
        <h2>test area</h2>
        <h3>the answer is: {this.props.data}</h3>
      </div>
    )
  }
}

export default connect(mapState)(TestComponent)