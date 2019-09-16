import React, { Component, Fragment } from 'react';
import { Col } from 'reactstrap';
import Select from 'react-select';

const findDepartment = (options, cod) => {
  let value = options.find(option => option.value === cod);
  return value ? value: '';
}
const findProvince = (options, cod) => {
  let value = options.find(option => option.value === cod);
  return value ? value: '';
}
const findDistrict = (options, cod) => {
  let value = options.find(option => option.value === cod);
  return value ? value: '';
}
class RegionField extends Component {
  constructor (props) {
    super(props);
    this.state = {
      departments: props.departments,
      provinces: props.provinces,
      districts: props.districts,
      codDep: '',
      codPro: '',
      codDis: '',
    }
  }
  componentDidMount() {
    if(this.props.value) {
      this.setStateRegion();
    }
  }

  componentDidUpdate(prevProps) {
    // console.log('cdup');
    if(prevProps.departments !== this.props.departments){
      this.setState({
        departments: this.props.departments,
      })
    }
    if(prevProps.provinces !== this.props.provinces){
      this.setState({
        provinces: this.props.provinces,
      })
    }
    if(prevProps.districts !== this.props.districts){
      this.setState({
        districts: this.props.districts,
      })
    }

    if(prevProps.value !== this.props.value) {
      this.setStateRegion();
    }
  }
  
  setStateRegion = () => {
    const { departments } = this.props;
    const codDep = this.props.value.substring(0,2),
          codPro = this.props.value.substring(2,4),
          codDis = this.props.value.substring(4,6);
    
    this.props.handleChangeDepartment(codDep);
    this.props.handleChangeProvince(codPro);

    this.setState({
      codDep: findDepartment(departments, codDep),
    }, () => this.setStateUbigeo(codPro, codDis))
    
  }

  setStateUbigeo = (codPro,codDis) => {
    const { provinces, districts } = this.props;
    this.setState({
      codPro: findProvince(provinces, codPro),
      codDis: findDistrict(districts, codDis)
    })
  }

  handleChangeDepartment = (selected) => {
    const value = selected ? selected.value : '00';
    this.props.handleChangeDepartment(value);
    this.setState({
      codDep: selected,
    }, () => this.setInputValue())
  }

  handleChangeProvince = (selected) => {
    const value = selected ? selected.value : '00';
    this.props.handleChangeProvince(value);
    this.setState({
      codPro: selected,
    }, () => this.setInputValue())
  }

  handleChangeDistrict = selected => {
    this.setState({
      codDis: selected,
    }, () => this.setInputValue())
  }

  setInputValue = () => {
    const { codDep, codPro, codDis } = this.state;
    let value = `${codDep ? codDep.value : '00'}${codPro ? codPro.value : '00'}${codDis ? codDis.value : '00'}`;
    this.props.onChange(value);
  }

  render() {
    // console.log('r');
    const { departments, provinces, districts, codDep, codPro, codDis } = this.state;
    return (
      <Fragment>
        <Col md={4}>
          <div className="form__form-group">
            <span className="form__form-group-label">Departamento</span>
            <div className="form__form-group-field">
              <div className="form__form-group-input-wrap">
                <Select
                  className="react-select"
                  classNamePrefix="react-select"
                  value={codDep}
                  options={departments}
                  placeholder="Seleccionar..."
                  isClearable={true}
                  onChange={this.handleChangeDepartment}
                  noOptionsMessage={() => 'No hay resultados' }
                />
              </div>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="form__form-group">
            <span className="form__form-group-label">Provincia</span>
            <div className="form__form-group-field">
              <div className="form__form-group-input-wrap">
                <Select
                  className="react-select"
                  classNamePrefix="react-select"
                  value={codPro}
                  options={provinces}
                  isDisabled={!(provinces.length > 0)}
                  placeholder="Seleccionar..."
                  isClearable={true}
                  onChange={this.handleChangeProvince}
                  noOptionsMessage={() => 'No hay resultados' }
                />
              </div>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="form__form-group">
            <span className="form__form-group-label">Distrito</span>
            <div className="form__form-group-field">
              <div className="form__form-group-input-wrap">
                <Select
                  className="react-select"
                  classNamePrefix="react-select"
                  value={codDis}
                  options={districts}
                  isDisabled={!(districts.length > 0)}
                  placeholder="Seleccionar..."
                  isClearable={true}
                  onChange={this.handleChangeDistrict}
                  noOptionsMessage={() => 'No hay resultados' }
                />
              </div>
            </div>
          </div>
        </Col>
      </Fragment>
    );
  }
}

const renderRegionField = props => (
  <RegionField
    {...props.input}
    departments={props.departments}
    provinces={props.provinces}
    districts={props.districts}
    handleChangeDepartment={props.handleChangeDepartment}
    handleChangeProvince={props.handleChangeProvince}
  />
);

export default renderRegionField;
