import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Alert from '@material-ui/lab/Alert';
import { clearFlash } from '../../actions/flash.creators';

const Flash = ({
  open,
  severity,
  message,
  clearFlash,
}) => (
  <Collapse in={open}>
    {
      open && (
        <Alert
          severity={severity}
          action={
            (
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  clearFlash();
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            )
          }
        >
          {message}
        </Alert>
      )
    }
  </Collapse>
);

const mapStateToProps = state => ({
  open: state.flash.open,
  severity: state.flash.severity,
  message: state.flash.message,
});

const mapDispatchToProps = dispatch => ({
  clearFlash: () => dispatch(clearFlash()),
});

Flash.propTypes = {
  severity: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  clearFlash: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Flash);
