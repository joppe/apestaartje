import type { SafeObserver } from '../observer/SafeObserver';

import type { Subscription } from './Subscription';

/**
 * A subscriber is a function that connects a data source to an observable.
 * It returns a subscription that can unsubscribe from the data source.
 */
export type Subscriber<T> = (observer: SafeObserver<T>) => Subscription;
