import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]
const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
const FiltersGroup = props => {
  const renderEmployeementTypeList = () => {
    const {updateEmploymentTypesChecked} = props
    return (
      <>
        <ul>
          {employmentTypesList.map(eachEmpType => {
            const updateTypesList = () => {
              updateEmploymentTypesChecked(eachEmpType.employmentTypeId)
            }
            return (
              <li key={eachEmpType.employmentTypeId} className="list-map">
                <input
                  onClick={updateTypesList}
                  type="checkbox"
                  id={eachEmpType.employmentTypeId}
                />
                <label htmlFor={eachEmpType.employmentTypeId}>
                  {eachEmpType.label}
                </label>
              </li>
            )
          })}
        </ul>
      </>
    )
  }
  const renderSalaryTypeList = () => {
    const {updateSalaryRangeId, activeSalaryRangeId} = props
    return (
      <>
        {salaryRangesList.map(eachSalary => {
          const onChangeRange = () => {
            updateSalaryRangeId(eachSalary.salaryRangeId)
          }
          const isChecked = eachSalary.salaryRangeId === activeSalaryRangeId
          return (
            <li key={eachSalary.salaryRangeId} className="list-map">
              <input
                onChange={onChangeRange}
                id={eachSalary.salaryRangeId}
                type="radio"
                checked={isChecked}
              />
              <label htmlFor={eachSalary.salaryRangeId}>
                {eachSalary.label}
              </label>
            </li>
          )
        })}
      </>
    )
  }
  return (
    <>
      <p>TEsT A</p>
      <h1>Type of Employment</h1>
      {renderEmployeementTypeList()}
      <h1>Salary Range</h1>
      {renderSalaryTypeList()}
      <p>TEsT B</p>
    </>
  )
}
export default FiltersGroup
