"use client";
import ErrorBoundary from '@/components/Error/ErrorBoundary';
import styles from './IMACardModulars.module.css';
import SetFigureUse, { SetFigureSkeleton } from '@/components/set/SetFigure';
import { Suspense } from 'react';


export default function IMACardModulars({ set_codes, className }: { set_codes: string[], className?: string }) {
    return (
        <div className={`${styles['imaCardModulars']} ${className}`} data-title={`Encuentros modulares`}>
            {set_codes.map((set_code) =>
                <ErrorBoundary key={`set-${set_code}`}>
                    <Suspense fallback={<SetFigureSkeleton />}>
                        <SetFigureUse key={set_code} code={set_code} className={styles['imaCardModularFigure']} />
                    </Suspense>
                </ErrorBoundary>
            )}
        </div>
    );
}