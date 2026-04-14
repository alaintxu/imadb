"use client";
import ErrorBoundary from '@/components/Error/ErrorBoundary';
import styles from './IMACardModulars.module.css';
import SetFigureUse, { SetFigureSkeleton } from '@/components/set/SetFigure';
import { Suspense } from 'react';
import { useTranslation } from '@/i18n/I18nProvider';


export default function IMACardModulars({ set_codes, className }: { set_codes: string[], className?: string }) {
      const { t } = useTranslation();
    
    return (
        <div className={`${styles['imaCardModulars']} ${className}`} data-title={t("imas.modularSets")}>
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