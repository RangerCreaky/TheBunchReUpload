import React from 'react';
import { useSelector } from 'react-redux';

const Alert = () => {
    const alertState = useSelector((state) => {
        return {
            alert: state.alert
        }
    });
    const renderAlerts = () => {
        return alertState.alert.map((alert) => {
            return (
                <div key={alert.id} className={`alert alert-bottom alert-${alert.alertType}`}>
                    {alert.msg}
                </div>
            )
        })
    }
    return (
        renderAlerts()
    );
}

export default Alert;