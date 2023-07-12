import React, { useState } from "react";
import { monthList } from "../helpers/date";
import { Form, Formik } from 'formik';
import { addEventValidator } from "../helpers/validator";
import { Button, DatePicker, Input, Modal, Select } from "antd";

const Header = ({month, year, days, addSchedule, setLoading, resetSchedule}) => {
    const [open, setOpen] = useState(false);
    const [openConfirmation, setOpenConfirmation] = useState(false);

    const initialValues = {};
    const options = Array.from({ length: days } , (itm, idx) => ({ value: idx + 1, label: idx + 1 }))

    const handleClose = () => setOpen(false);

    return (
        <div className="header-wrapper">
            <div className="header-info-wrapper">
                <span className="header-month">
                    {monthList[month]}
                </span>
                <span className="header-year">{year}</span>
            </div>

            <div className="add-event-wrapper">
                <Button variant="contained" onClick={() => setOpen(true)}>Add Event</Button>
                <Button type="primary" danger onClick={() => setOpenConfirmation(true)} >Reset Event</Button>
            </div>

            <Modal
                title="Add Event"
                open={open}
                onOk={handleClose}
                onCancel={handleClose}
                footer={false}
            >
                <Formik
                    initialValues={initialValues}
                    validationSchema={addEventValidator}
                    onSubmit={(values, actions) => {
                        setLoading(true);
                        addSchedule(values);
                        actions.setSubmitting(false);
                        handleClose();
                    }}
                >
                    {({
                        values,
                        handleSubmit,
                        isSubmitting,
                        setFieldValue,
                        errors,
                        submitForm
                    }) => {
                        return <Form onSubmit={handleSubmit} autoComplete="off">
                            <div className="form-controller">
                                <div className="label">
                                    <p type="secondary">Event Title</p>
                                </div>
                                <Input
                                    onChange={(e) => setFieldValue('title', e.target.value)}
                                    style={{ width: '100%' }}
                                />
                                { errors && errors.title && <div className='error-field'>{errors.title}</div> }
                            </div>
                            <div className="form-controller">
                                <div className="label">
                                    <p type="secondary">Email</p>
                                </div>
                                <Input
                                    onChange={(e) => setFieldValue('email', e.target.value)}
                                    style={{ width: '100%' }}
                                />
                                { errors && errors.email && <div className='error-field'>{errors.email}</div> }
                            </div>
                            <div className="form-controller">
                                <div className="label">
                                    <p type="secondary">Event Date</p>
                                </div>
                                <Select
                                    onChange={(value) => setFieldValue('date', value)}
                                    style={{ width: '100%' }}
                                    options={options}
                                />
                                { errors && errors.date && <div className='error-field'>{errors.date}</div> }
                            </div>
                            <div className="form-controller">
                                <div className="label">
                                    <p type="secondary">Event Time</p>
                                </div>
                                <DatePicker
                                    picker="time"
                                    onChange={(value) => setFieldValue('time', value)}
                                />
                                { errors && errors.time && <div className='error-field'>{errors.time}</div> }
                            </div>

                            <div className="button-wrapper">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    disabled={
                                        isSubmitting ||
                                        Object.keys(errors).length > 0 ||
                                        Object.keys(values).length < 1
                                    }
                                >
                                    Save Event
                                </Button>
                            </div>
                        </Form>
                    }}
                </Formik>
            </Modal>

            <Modal
                title="Delete"
                open={openConfirmation}
                onOk={() => {
                    resetSchedule();
                    setOpenConfirmation(false);
                }}
                onCancel={() => setOpenConfirmation(false)}
            >
                <p>Are you sure want to reset all event?</p>
            </Modal>

        </div>
    );
}

export default Header;