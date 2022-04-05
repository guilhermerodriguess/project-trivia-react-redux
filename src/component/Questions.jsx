import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import store from '../redux/store';
import { updateToken } from '../redux/actions';

class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      validToken: false,
    };
  }

  componentDidMount() {
    this.validateAPI();
    store.subscribe(this.updateToken);
  }

  updateToken = () => {
    this.setState((prevState) => ({
      validToken: !prevState.validToken,
    }));
  }

  requestAPI = async () => {
    const { token } = this.props;
    const endPoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(endPoint);
    const responseJSOn = await response.json();
    console.log(responseJSOn);
    return responseJSOn;
  }

  validateAPI = async () => {
    const response = this.requestAPI();
    const expirationCode = 3;
    if (response.response_code === expirationCode) {
      const { getToken } = this.props;
      getToken();
    }
  }

  render() {
    const responseApi = this.requestAPI();
    // const { category } = responseApi.results;
    console.log(responseApi, 'resposta aqui');
    return (
      <div>
        <h2 data-testid="question-category"> </h2>
      </div>
    );
  }
}

Questions.propTypes = {
  getToken: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(updateToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
