import { useState } from 'react';
import api from '../services/api';

export const useEnquiry = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const clearErrors = () => {
    setError(null);
    setValidationErrors({});
  };

  const submitEnquiry = async (enquiryData) => {
    setLoading(true);
    clearErrors();

    try {
      const result = await api.enquiry.create(enquiryData);
      setLoading(false);
      return result;
    } catch (err) {
      setLoading(false);
      
      if (err.type === 'VALIDATION_ERROR') {
        setValidationErrors(err.validationErrors);
        throw err;
      } else {
        setError(err.message);
        throw err;
      }
    }
  };

  const fetchEnquiries = async (params) => {
    setLoading(true);
    clearErrors();

    try {
      const result = await api.enquiry.getAll(params);
      setLoading(false);
      return result;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      throw err;
    }
  };

  const fetchEnquiryById = async (id) => {
    setLoading(true);
    clearErrors();

    try {
      const result = await api.enquiry.getById(id);
      setLoading(false);
      return result;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      throw err;
    }
  };

  const updateEnquiryStatus = async (id, status, reason) => {
    setLoading(true);
    clearErrors();

    try {
      const result = await api.enquiry.updateStatus(id, status, reason);
      setLoading(false);
      return result;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      throw err;
    }
  };

  const addEnquiryNote = async (id, note, isPrivate) => {
    setLoading(true);
    clearErrors();

    try {
      const result = await api.enquiry.addNote(id, note, isPrivate);
      setLoading(false);
      return result;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      throw err;
    }
  };

  const fetchStats = async () => {
    setLoading(true);
    clearErrors();

    try {
      const result = await api.enquiry.getStats();
      setLoading(false);
      return result;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      throw err;
    }
  };

  return {
    loading,
    error,
    validationErrors,
    clearErrors,
    submitEnquiry,
    fetchEnquiries,
    fetchEnquiryById,
    updateEnquiryStatus,
    addEnquiryNote,
    fetchStats,
  };
};