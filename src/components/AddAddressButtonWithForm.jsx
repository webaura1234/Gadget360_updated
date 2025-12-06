import React, { useState } from 'react';

const INDIAN_STATES = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
    "Delhi",
    "Puducherry",
    "Ladakh",
    "Jammu and Kashmir",
];

const styles = {
    container: {
        fontFamily: '"Inter", sans-serif',
    },
    buttonPrimary: {
        backgroundColor: '#000',
        color: '#fff',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '9999px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
    buttonSecondary: {
        backgroundColor: 'transparent',
        color: '#000',
        border: '1px solid #ccc',
        padding: '12px 24px',
        borderRadius: '9999px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        marginRight: '12px',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '500px',
        padding: '32px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        position: 'relative',
        maxHeight: '90vh',
        overflowY: 'auto',
    },
    modalHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
    },
    title: {
        fontSize: '20px',
        fontWeight: '700',
        margin: 0,
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        fontSize: '24px',
        lineHeight: '1',
        cursor: 'pointer',
        color: '#666',
    },
    formGroup: {
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        fontSize: '13px',
        fontWeight: '600',
        marginBottom: '8px',
        color: '#333',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    input: {
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        fontSize: '15px',
        outline: 'none',
        transition: 'border-color 0.2s',
    },
    select: {
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        fontSize: '15px',
        outline: 'none',
        backgroundColor: '#fff',
        cursor: 'pointer',
    },
    checkboxGroup: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '24px',
        cursor: 'pointer',
    },
    checkbox: {
        marginRight: '10px',
        width: '18px',
        height: '18px',
        cursor: 'pointer',
    },
    errorMsg: {
        color: '#d32f2f',
        fontSize: '12px',
        marginTop: '6px',
    },
    footer: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '10px',
    },
};

function AddressForm({ onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        addressLine1: '',
        addressLine2: '',
        landmark: '',
        city: '',
        state: '',
        pincode: '',
        isDefault: false,
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phoneNumber.trim())) {
            newErrors.phoneNumber = 'Enter a valid 10-digit mobile number';
        }

        if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address Line 1 is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State is required';

        if (!formData.pincode.trim()) {
            newErrors.pincode = 'Pincode is required';
        } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
            newErrors.pincode = 'Pincode must be 6 digits';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        // Clear error for this field when typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
        }
    };

    return (
        <div style={styles.modalOverlay} onClick={(e) => {
            // Close on backdrop click
            if (e.target === e.currentTarget) onCancel();
        }}>
            <div style={styles.modalContent}>
                <div style={styles.modalHeader}>
                    <h2 style={styles.title}>Add Delivery Address</h2>
                    <button style={styles.closeBtn} onClick={onCancel}>&times;</button>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Full Name *</label>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full name"
                            value={formData.fullName}
                            onChange={handleChange}
                            style={{ ...styles.input, borderColor: errors.fullName ? '#d32f2f' : '#e0e0e0' }}
                        />
                        {errors.fullName && <span style={styles.errorMsg}>{errors.fullName}</span>}
                    </div>

                    {/* Phone Number */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Phone Number *</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder="10-digit mobile number"
                            maxLength="10"
                            value={formData.phoneNumber}
                            onChange={(e) => {
                                // Only allow digits
                                const val = e.target.value.replace(/\D/g, '');
                                handleChange({ target: { name: 'phoneNumber', value: val } });
                            }}
                            style={{ ...styles.input, borderColor: errors.phoneNumber ? '#d32f2f' : '#e0e0e0' }}
                        />
                        {errors.phoneNumber && <span style={styles.errorMsg}>{errors.phoneNumber}</span>}
                    </div>

                    {/* Address Line 1 */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Address Line 1 *</label>
                        <input
                            type="text"
                            name="addressLine1"
                            placeholder="House no, street"
                            value={formData.addressLine1}
                            onChange={handleChange}
                            style={{ ...styles.input, borderColor: errors.addressLine1 ? '#d32f2f' : '#e0e0e0' }}
                        />
                        {errors.addressLine1 && <span style={styles.errorMsg}>{errors.addressLine1}</span>}
                    </div>

                    {/* Address Line 2 */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Address Line 2</label>
                        <input
                            type="text"
                            name="addressLine2"
                            placeholder="Area, locality (optional)"
                            value={formData.addressLine2}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </div>

                    {/* Landmark */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Landmark</label>
                        <input
                            type="text"
                            name="landmark"
                            placeholder="Nearby landmark (optional)"
                            value={formData.landmark}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        {/* City */}
                        <div style={styles.formGroup}>
                            <label style={styles.label}>City *</label>
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={formData.city}
                                onChange={handleChange}
                                style={{ ...styles.input, borderColor: errors.city ? '#d32f2f' : '#e0e0e0' }}
                            />
                            {errors.city && <span style={styles.errorMsg}>{errors.city}</span>}
                        </div>

                        {/* State */}
                        <div style={styles.formGroup}>
                            <label style={styles.label}>State *</label>
                            <select
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                style={{ ...styles.select, borderColor: errors.state ? '#d32f2f' : '#e0e0e0' }}
                            >
                                <option value="">Select State</option>
                                {INDIAN_STATES.map((state) => (
                                    <option key={state} value={state}>
                                        {state}
                                    </option>
                                ))}
                            </select>
                            {errors.state && <span style={styles.errorMsg}>{errors.state}</span>}
                        </div>
                    </div>

                    {/* Pincode */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Pincode *</label>
                        <input
                            type="text"
                            name="pincode"
                            placeholder="6-digit Pincode"
                            maxLength="6"
                            value={formData.pincode}
                            onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '');
                                handleChange({ target: { name: 'pincode', value: val } });
                            }}
                            style={{ ...styles.input, borderColor: errors.pincode ? '#d32f2f' : '#e0e0e0' }}
                        />
                        {errors.pincode && <span style={styles.errorMsg}>{errors.pincode}</span>}
                    </div>

                    {/* Default Address Checkbox */}
                    <label style={styles.checkboxGroup}>
                        <input
                            type="checkbox"
                            name="isDefault"
                            checked={formData.isDefault}
                            onChange={handleChange}
                            style={styles.checkbox}
                        />
                        <span style={{ fontSize: '14px', fontWeight: '500' }}>Set as default address</span>
                    </label>

                    {/* Actions */}
                    <div style={styles.footer}>
                        <button
                            type="button"
                            onClick={onCancel}
                            style={styles.buttonSecondary}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            style={styles.buttonPrimary}
                        >
                            Save address
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function AddAddressButtonWithForm() {
    const [isOpen, setIsOpen] = useState(false);

    const handleAddressSubmit = (address) => {
        console.log('Submitted Address:', address);
        setIsOpen(false);
    };

    return (
        <div style={styles.container}>
            <button
                onClick={() => setIsOpen(true)}
                style={styles.buttonPrimary}
            >
                Add address
            </button>

            {isOpen && (
                <AddressForm
                    onSubmit={handleAddressSubmit}
                    onCancel={() => setIsOpen(false)}
                />
            )}
        </div>
    );
}
