import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Row, Col, Button } from 'reactstrap';

// components
import PageLoading from '../../../../shared/components/PageLoading';
import SelectField from '../../../../shared/components/form/Select';
import TextField from '../../../../shared/components/form/TextField';

// redux
import { loadLevels, loadGrades } from '../../../../redux/actions/complement';

// utils
import { toUpper, normalizeNumber } from '../../../../utils/utils';
import { setPropsAsInitial } from '../../../../helpers/setPropsAsInitial';

const validate = values => {
    const errors = {};
    const requiredFields = [
      'levelId',
      'gradeId',
    //   'classroom',
    //   'capacity'
    ];
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Requerido';
      }
    });
    return errors;
  }

class ClassroomForm extends Component {

    componentDidMount() {
        this.props.loadLevels();
        this.props.loadGrades();
    }
    
    render() {
        const { 
            handleSubmit,
            pristine,
            invalid,
            submitting,
            reset,
            levels,
            grades } = this.props;
        return (
            <form onSubmit={handleSubmit} className="form">
                <Row>
                    <Col md={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Nivel</span>
                            <div className="form__form-group-field">
                                <Field 
                                    name="levelId"
                                    component={SelectField}
                                    options={levels} 
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Grado</span>
                            <div className="form__form-group-field">
                                <Field 
                                    name="gradeId"
                                    component={SelectField}
                                    options={grades} 
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
                {/* <Row>
                    <Col md={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Sección</span>
                            <div className="form__form-group-field">
                                <Field 
                                    name="classroom"
                                    component={TextField}
                                    type='text'
                                    parse={toUpper}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">Vacantes</span>
                            <div className="form__form-group-field">
                                <Field 
                                    name="capacity"
                                    component={TextField}
                                    type='text'
                                    normalize={normalizeNumber}
                                />
                            </div>
                        </div>
                    </Col>
                </Row> */}
                <Row>
                    <Col md={12}>
                        <Button disabled={ invalid || pristine || submitting } color="primary" size="sm" type="submit" >Guardar</Button>
                        <Button disabled={ pristine || submitting } size="sm" onClick={reset}>Cancelar</Button>
                    </Col>
                </Row>
                { submitting && <PageLoading />}
            </form>
        );
    }
}
ClassroomForm.propTypes = {
    levels: PropTypes.array.isRequired,
    grades: PropTypes.array.isRequired,
    loadLevels: PropTypes.func.isRequired,
    loadGrades: PropTypes.func.isRequired,
}
ClassroomForm.defaultProps = {
    levels: [],
    grades: []
}
const ClassroomFormEdit = reduxForm(
  {
    form: 'classroom_form',
    validate
  }
)(ClassroomForm);

const mapStateToProps = state => ({
  levels: state.complement.levels,
  grades: state.complement.grades,
});

export default connect(mapStateToProps,{
    loadLevels,
    loadGrades,
})(setPropsAsInitial(ClassroomFormEdit));
