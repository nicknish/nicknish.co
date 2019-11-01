// https://github.com/Microsoft/TypeScript/issues/3180#issuecomment-283007750
import * as Sentry from '@sentry/browser';

export as namespace Sentry;
export = Sentry;
