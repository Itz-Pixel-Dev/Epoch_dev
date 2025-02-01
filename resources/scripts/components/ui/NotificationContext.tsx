import React, { createContext, useContext, useCallback, useState } from 'react';
import { Notification, NotificationContainer } from './Notification';
import { v4 as uuidv4 } from 'uuid';

interface NotificationItem {
	id: string;
	type: 'success' | 'error' | 'warning' | 'info';
	title: string;
	message: string;
}

interface NotificationContextType {
	showNotification: (type: NotificationItem['type'], title: string, message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [notifications, setNotifications] = useState<NotificationItem[]>([]);

	const removeNotification = useCallback((id: string) => {
		setNotifications(prev => prev.filter(notification => notification.id !== id));
	}, []);

	const showNotification = useCallback((type: NotificationItem['type'], title: string, message: string) => {
		const id = uuidv4();
		setNotifications(prev => [...prev, { id, type, title, message }]);

		// Auto remove after 5 seconds
		setTimeout(() => removeNotification(id), 5000);
	}, [removeNotification]);

	return (
		<NotificationContext.Provider value={{ showNotification }}>
			{children}
			<NotificationContainer>
				{notifications.map(notification => (
					<Notification
						key={notification.id}
						{...notification}
						onClose={removeNotification}
					/>
				))}
			</NotificationContainer>
		</NotificationContext.Provider>
	);
};

export const useNotification = () => {
	const context = useContext(NotificationContext);
	if (!context) {
		throw new Error('useNotification must be used within NotificationProvider');
	}
	return context;
};