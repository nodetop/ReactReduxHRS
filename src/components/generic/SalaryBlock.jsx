import React from "react";
import {orderBy} from 'lodash';
import moment from 'moment';

const SalaryBlock = ({ item, userid, displayPage, viewSalarySummary, callDeleteUserSalary, salaryStructure, callAddUserHolding }) => {
    const total_earning = (item.Basic*1 + item.HRA*1 + item.Conveyance*1 + item.Medical_Allowance*1 + item.Special_Allowance*1 + item.Arrears*1).toFixed(2);
    const total_deduction = (item.EPF*1 + item.Loan*1 + item.Advance*1 + item.Misc_Deductions*1 + item.TDS*1).toFixed(2);
    const valueDecimal = (val) => {
        let v = Number(val);
        return Math.round(v) === v ? v : v.toFixed(2);
    }
    let orderedSalary = orderBy(salaryStructure.salary_details,['date'],['desc']);
    let orderedHolding = orderBy(salaryStructure.holding_details,['last_updated_on'],['desc']);
    let isHolding = false;
    if(orderedSalary.length > 0 && orderedHolding.length > 0){
        isHolding = orderedSalary[0].date === item.date && orderedHolding[0].holding_amt > 0;
    }
    const  handleRemoveHolding = () => {
        let params  = {
            user_id: userid,
            holding_from: moment().format('YYYY-MM-DD'),
            holding_till: 12,
            holding_amount: '0',
            reason: 'Holding removed using button click'
          }
          callAddUserHolding(params)
    }
    return (
        <div className="row salary-blocks-margin salary-row-bg" onClick={(e) => displayPage === "manage" && viewSalarySummary(e, item.test.id)}>
            <div className="col-md-12 col-sm-12 salary-col-title-padding">
                <div>
                    <span className="salary-title">Applicable From: </span> {moment(item.test.applicable_from).format("DD-MMMM-YYYY") || '--'} <span className="divider">|</span>
                    <span className="salary-title"> Applicable Till: </span> {`${item.test.applicable_month ? item.test.applicable_month + ' months' : '--'} (${moment(item.test.applicable_till).format("DD-MMMM-YYYY") || '--'})`} <span className="divider">|</span>
                    <span className="salary-title"> Increment Amount: </span> {item.Increment_Amount || '--'} <span className="divider">|</span>
                    <span className="salary-title"> Leaves Allocated: </span> {item.test.leaves_allocated || '--'} <span className="divider">|</span>
                    <span className="salary-title"> Updated On: </span> {moment(item.test.last_updated_on).format("DD-MMMM-YYYY") || '--'}
                </div>
            </div>
            <div className="col-md-12 salary-col-padding salary-details">
                <div className="col-md-1 col-sm-2 col-xs-12 salary-total-width">
                    <div className="col-sm-12 salary-total-title">Total</div>
                    <div className="col-sm-12 salary-total-value">{item.test.total_salary}</div>
                </div>
                <div className="col-md-5 col-sm-10 col-xs-12 bg-success salary-block salary-addition-width">
                    <div className="col-sm-12">
                        <div className="col-sm-12 salary-total-title">Total Earnings</div>
                        <div className="col-sm-12 salary-total-value">{total_earning}</div>
                    </div>
                    <div className="col-sm-2 col-xs-12 cell salary-basic-width">
                        <div className="col-sm-12 salary-title">Basic</div>
                        <div className="col-sm-12">{valueDecimal(item.Basic)}</div>
                    </div>
                    <div className="col-sm-2 col-xs-12 cell salary-hra-width">
                        <div className="col-sm-12 salary-title">HRA</div>
                        <div className="col-sm-12">{valueDecimal(item.HRA)}</div>
                    </div>
                    <div className="col-sm-2 col-xs-12 cell salary-conveyance-width">
                        <div className="col-sm-12 salary-title">Conveyance</div>
                        <div className="col-sm-12">{valueDecimal(item.Conveyance)}</div>
                    </div>
                    <div className="col-sm-2 col-xs-12 cell salary-medical-width">
                        <div className="col-sm-12 salary-title">Medical Allowance</div>
                        <div className="col-sm-12">{valueDecimal(item.Medical_Allowance)}</div>
                    </div>
                    <div className="col-sm-2 col-xs-12 cell salary-special-width">
                        <div className="col-sm-12 salary-title">Special Allowance</div>
                        <div className="col-sm-12">{valueDecimal(item.Special_Allowance)}</div>
                    </div>
                    <div className="col-sm-2 col-xs-12 cell salary-arrears-width">
                        <div className="col-sm-12 salary-title">Arrears</div>
                        <div className="col-sm-12">{valueDecimal(item.Arrears)}</div>
                    </div>
                </div>
                <div className="col-md-6 col-sm-12 col-xs-12 bg-danger salary-block salary-deduction-width">
                    <div className="col-sm-8">
                        <div className="col-sm-12 salary-total-title">Total Deductions</div>
                        <div className="col-sm-12 salary-total-value">{total_deduction}</div>
                    </div>
                    <div className="col-sm-4 col-xs-12 cell remove-holding-btn-wrapper">
                        {isHolding && <span className="remove-holding-btn" onClick={()=>handleRemoveHolding()}>Remove Holding</span>}
                    </div>
                    <div className="col-sm-2 col-xs-12 cell salary-epf-width">
                        <div className="col-sm-12 salary-title">EPF</div>
                        <div className="col-sm-12">{valueDecimal(item.EPF)}</div>
                    </div>
                    <div className="col-sm-2 col-xs-12 cell salary-loan-width">
                        <div className="col-sm-12 salary-title">Loan</div>
                        <div className="col-sm-12">{valueDecimal(item.Loan)}</div>
                    </div>
                    <div className="col-sm-2 col-xs-12 cell salary-advance-width">
                        <div className="col-sm-12 salary-title">Advance</div>
                        <div className="col-sm-12">{valueDecimal(item.Advance)}</div>
                    </div>
                    <div className="col-sm-2 col-xs-12 cell salary-miscdeductions-width">
                        <div className="col-sm-12 salary-title">Misc Deductions</div>
                        <div className="col-sm-12">{valueDecimal(item.Misc_Deductions)}</div>
                    </div>
                    <div className="col-sm-1 col-xs-12 cell salary-tds-width">
                        <div className="col-sm-12 salary-title">TDS</div>
                        <div className="col-sm-12">{valueDecimal(item.TDS)}</div>
                    </div>
                    {displayPage === "manage" ?
                        (
                            <div className="col-sm-3 col-xs-12 cell center salary-options-width">
                                <div className="text-center">
                                    <i
                                        className="material-icons delete-icon"
                                        onClick={(e) => callDeleteUserSalary(e, item.test.user_Id, item.test.id)}
                                    >
                                        delete_forever
                                </i>
                                </div>
                            </div>) :
                        ( ""
                            // <div className="col-sm-3 col-xs-12 cell">
                            //     <div className="col-sm-12 salary-title">Holding Amount</div>
                            //     <div className="col-sm-12 salary-holding-btn">
                            //         <input type="text"
                            //             className="col-md-6 col-sm-6"
                            //         />
                            //         <input type="button"
                            //             className="col-md-6 col-sm-6 sm-btn md-raised info salary-add-holding"
                            //             value="Add" />
                            //     </div>
                            // </div>
                        )}
                </div>
            </div>
        </div>
    );
};

export default SalaryBlock;