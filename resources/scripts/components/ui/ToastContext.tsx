import React, { createContext, useContext, useCallback, useState } from 'react';
import { Toast, ToastContainer } from './Toast';
import { v4 as uuidv4 } from 'uuid';

interface ToastItem {
	id: string;
	type: 'success' | 'error' | 'warning' | 'info';
	message: string;
}

interface ToastContextType {
	toast: (type: ToastItem['type'], message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [toasts, setToasts] = useState<ToastItem[]>([]);

	const removeToast = useCallback((id: string) => {
		setToasts(prev => prev.filter(toast => toast.id !== id));
	}, []);

	const toast = useCallback((type: ToastItem['type'], message: string) => {
		const id = uuidv4();
		setToasts(prev => [...prev, { id, type, message }]);
	}, []);

	return (
		<ToastContext.Provider value={{ toast }}>
			{children}
			<ToastContainer>
				{toasts.map(toast => (
					<Toast
						key={toast.id}
						{...toast}
						onClose={removeToast}
					/>
				))}
			</ToastContainer>
		</ToastContext.Provider>
	);
};

export const useToast = () => {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error('useToast must be used within ToastProvider');
	}
	return context;
};