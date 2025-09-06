import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../styles/registroStyles';
import { validateFields, getPasswordStrength } from '../utils/validators';

const RegistroForm = () => {
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
    confirmar: '',
    telefono: ''
  });

  const [errors, setErrors] = useState({});
  const [strength, setStrength] = useState('');

  useEffect(() => {
    setStrength(getPasswordStrength(form.contraseña));
  }, [form.contraseña]);

  const handleChange = (field, value) => {
    const updatedForm = { ...form, [field]: value };
    setForm(updatedForm);
    setErrors(validateFields(updatedForm));
  };

  const handleSubmit = () => {
    const finalErrors = validateFields(form);
    setErrors(finalErrors);
    if (Object.keys(finalErrors).length === 0) {
      Alert.alert('Registro exitoso ✅');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      {['nombre', 'correo', 'contraseña', 'confirmar', 'telefono'].map((field) => (
        <View key={field}>
          <TextInput
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            secureTextEntry={field.includes('contraseña')}
            keyboardType={field === 'correo' ? 'email-address' : field === 'telefono' ? 'phone-pad' : 'default'}
            style={[
              styles.input,
              errors[field] ? styles.inputError : styles.inputValid
            ]}
            onChangeText={(value) => handleChange(field, value)}
            value={form[field]}
          />
          {errors[field] && <Text style={styles.error}>{errors[field]}</Text>}
        </View>
      ))}
      {form.contraseña.length > 0 && (
        <Text style={styles.strength}>Fortaleza: {strength}</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegistroForm;