import React, { useState } from 'react';
import { useGrid } from '../context/GridContext';

export default function AlertsPage() {
  const {
    alerts,
    selectedAlert,
    selectedAlertId,
    setSelectedAlertId,
    navigateToAsset,
    navigateToSimulation,
    addToast
  } = useGrid();

  const [assetTypeFilter, setAssetTypeFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [stateFilter, setStateFilter] = useState('All');

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSeverity =
      severityFilter === 'All' ||
      (severityFilter === 'Critical' && alert.severity === 'CRIT') ||
      (severityFilter === 'High' && alert.severity === 'HIGH') ||
      (severityFilter === 'Medium' && alert.severity === 'MED') ||
      (severityFilter === 'Degraded' && alert.severity === 'DEGRAD');

    const matchesType =
      assetTypeFilter === 'All' ||
      (assetTypeFilter === 'Transformers' && alert.assetId.startsWith('TX')) ||
      (assetTypeFilter === 'Feeders' && alert.assetId.startsWith('Feeder'));

    return matchesSeverity && matchesType;
  });

  const handleSilenceAudio = () => {
    addToast(`Audio klaxon silenced for incident [${selectedAlert.id}]. Visual SCADA telemetry alarms remain active.`, 'warn');
  };

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {/* =========================================================================
          1. CONTROL ROOM HEADER (HEADING ONLY - SEARCH & BUTTONS REMOVED)
         ========================================================================= */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-space-xs mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-error animate-pulse"></span>
          <span className="font-label-code text-label-code text-error tracking-widest uppercase font-bold">
            DISPATCH INTERVENTION LEVEL 1 • ACTIVE GRID EXCEPTIONS
          </span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tight">
          Alerts &amp; Risk Monitoring
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
          Real-time SCADA anomaly registry, priority telemetry exception tracking, and automated AI diagnostic dossiers across high-voltage regional transmission and distribution nodes.
        </p>
      </div>

      {/* 4 TACTICAL STATUS METRIC PANELS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-sm">
        {/* Critical Panel */}
        <div className="bg-surface-container-lowest p-space-md shadow-sm relative overflow-hidden flex flex-col justify-between border border-surface-variant">
          <div className="absolute top-0 left-0 right-0 h-1 bg-error"></div>
          <div>
            <div className="flex items-center justify-between font-label-code text-label-code mb-1">
              <span className="text-error uppercase tracking-wider font-bold">CRITICAL ALERTS</span>
              <span className="px-1.5 py-0.5 bg-error text-on-error uppercase font-label-code text-label-code font-bold">
                URGENT
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-display text-display text-error leading-none">1</span>
              <span className="font-label-meta text-label-meta text-on-surface-variant uppercase">ACTIVE TRIGGER</span>
            </div>
          </div>
          <div className="mt-space-md pt-space-xs bg-surface-container-low p-2 border border-surface-variant/40">
            <p className="font-label-meta text-label-meta text-error font-bold uppercase truncate">
              TX-04 • THERMAL RUNAWAY DANGER
            </p>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Top-oil exceeded 94.2°C design ceiling
            </span>
          </div>
        </div>

        {/* High-Risk Panel */}
        <div className="bg-surface-container-lowest p-space-md shadow-sm relative overflow-hidden flex flex-col justify-between border border-surface-variant">
          <div className="absolute top-0 left-0 right-0 h-1 bg-primary"></div>
          <div>
            <div className="flex items-center justify-between font-label-code text-label-code mb-1">
              <span className="text-primary uppercase tracking-wider font-bold">HIGH-RISK CONDITIONS</span>
              <span className="px-1.5 py-0.5 bg-primary-fixed text-on-primary-fixed uppercase font-label-code text-label-code font-bold">
                INTERVENE
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-display text-display text-primary leading-none">3</span>
              <span className="font-label-meta text-label-meta text-on-surface-variant uppercase">ASSETS AT RISK</span>
            </div>
          </div>
          <div className="mt-space-md pt-space-xs bg-surface-container-low p-2 border border-surface-variant/40">
            <p className="font-label-meta text-label-meta text-primary font-bold uppercase truncate">
              CB-12, TX-09, RECL-03
            </p>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Harmonics &amp; conductor overhead loads
            </span>
          </div>
        </div>

        {/* Medium / Monitored */}
        <div className="bg-surface-container-lowest p-space-md shadow-sm relative overflow-hidden flex flex-col justify-between border border-surface-variant">
          <div className="absolute top-0 left-0 right-0 h-1 bg-tertiary"></div>
          <div>
            <div className="flex items-center justify-between font-label-code text-label-code mb-1">
              <span className="text-on-surface-variant uppercase tracking-wider font-bold">MEDIUM / MONITORED</span>
              <span className="px-1.5 py-0.5 bg-surface-container-high text-on-surface-variant uppercase font-label-code text-label-code">
                OBSERVE
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-display text-display text-on-surface leading-none">8</span>
              <span className="font-label-meta text-label-meta text-on-surface-variant uppercase">UNDER SURVEILLANCE</span>
            </div>
          </div>
          <div className="mt-space-md pt-space-xs bg-surface-container-low p-2 border border-surface-variant/40">
            <p className="font-label-meta text-label-meta text-on-surface font-bold uppercase truncate">
              BASELINE TREND DRIFT
            </p>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              DGA Hydrogen + Phase-B balance checks
            </span>
          </div>
        </div>

        {/* Stale / Degraded */}
        <div className="bg-surface-container p-space-md shadow-sm relative overflow-hidden flex flex-col justify-between border border-surface-variant">
          <div className="absolute top-0 left-0 right-0 h-1 bg-outline"></div>
          <div>
            <div className="flex items-center justify-between font-label-code text-label-code mb-1">
              <span className="text-on-surface uppercase tracking-wider font-bold">STALE / DEGRADED TELEMETRY</span>
              <span className="px-1.5 py-0.5 bg-surface-variant text-on-surface-variant uppercase font-label-code text-label-code">
                &gt;120s LATENCY
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-display text-display text-on-surface-variant leading-none">2</span>
              <span className="font-label-meta text-label-meta text-on-surface-variant uppercase">FEEDER SENSORS</span>
            </div>
          </div>
          <div className="mt-space-md pt-space-xs bg-surface-container-high p-2 border border-surface-variant/40">
            <p className="font-label-meta text-label-meta text-on-surface-variant font-bold uppercase truncate">
              POLLING LATENCY DROPS
            </p>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              North Sub feeder gateway timeout warnings
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. FIXED MULTI-STAGE FILTER CONTROLS BAR
         ========================================================================= */}
      <div className="bg-surface-container-lowest p-space-md shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-space-md border border-surface-variant">
        <div className="flex flex-wrap items-center gap-space-md sm:gap-space-lg">
          {/* Severity Filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-label-meta text-label-meta text-tertiary uppercase font-bold mr-1">
              SEVERITY:
            </span>
            {[
              { id: 'All', label: 'ALL' },
              { id: 'Critical', label: 'CRITICAL (1)', color: 'bg-error text-on-error' },
              { id: 'High', label: 'HIGH (3)', color: 'bg-primary text-on-primary' },
              { id: 'Medium', label: 'MEDIUM (8)', color: 'bg-surface-container text-on-surface-variant' },
              { id: 'Degraded', label: 'DEGRADED (2)', color: 'bg-surface-container text-on-surface-variant' }
            ].map((sev) => {
              const isSelected = severityFilter === sev.id;
              return (
                <button
                  key={sev.id}
                  onClick={() => setSeverityFilter(sev.id)}
                  className={`px-2.5 py-1 font-label-code text-[0.6875rem] uppercase tracking-wider transition-all cursor-pointer ${
                    isSelected
                      ? sev.id === 'Critical'
                        ? 'bg-error text-on-error font-bold shadow-xs'
                        : sev.id === 'High'
                        ? 'bg-primary text-on-primary font-bold shadow-xs'
                        : 'bg-inverse-surface text-inverse-on-surface font-bold shadow-xs'
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container border border-outline-variant/40'
                  }`}
                >
                  {sev.label}
                </button>
              );
            })}
          </div>

          {/* Asset Type */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-label-meta text-label-meta text-tertiary uppercase font-bold mr-1">
              ASSET:
            </span>
            {['All', 'Transformers', 'Feeders'].map((type) => {
              const isSelected = assetTypeFilter === type;
              return (
                <button
                  key={type}
                  onClick={() => setAssetTypeFilter(type)}
                  className={`px-2.5 py-1 font-label-code text-[0.6875rem] uppercase tracking-wider transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-primary text-on-primary font-bold shadow-xs'
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container border border-outline-variant/40'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>

          {/* State Filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-label-meta text-label-meta text-tertiary uppercase font-bold mr-1">
              STATE:
            </span>
            {['All', 'Active Dispatch', 'Monitored'].map((state) => {
              const isSelected = stateFilter === state;
              return (
                <button
                  key={state}
                  onClick={() => setStateFilter(state)}
                  className={`px-2.5 py-1 font-label-code text-[0.6875rem] uppercase tracking-wider transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-secondary text-on-secondary font-bold shadow-xs'
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container border border-outline-variant/40'
                  }`}
                >
                  {state}
                </button>
              );
            })}
          </div>
        </div>

        {/* Status Counter & Polling Badge */}
        <div className="flex items-center gap-space-md shrink-0">
          <div className="px-2.5 py-1 bg-surface-container font-label-code text-[0.6875rem] text-tertiary border border-outline-variant/40 uppercase">
            <strong className="text-on-surface">{filteredAlerts.length}</strong> Anomalies Filtered
          </div>
          <div className="flex items-center gap-1.5 font-label-code text-[0.6875rem] text-tertiary">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span className="uppercase">DNP3 SYNC: 5s CYCLE</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. ACTIVE SCADA ANOMALY QUEUE (FULL WIDTH TABLE)
         ========================================================================= */}
      <div className="w-full flex flex-col bg-surface-container-lowest shadow-sm overflow-hidden border border-surface-variant">
        <div className="px-space-md py-space-sm bg-surface-container-high flex items-center justify-between border-b border-surface-variant">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[1.25rem]">warning</span>
            <span className="font-headline-sm text-headline-sm text-on-surface uppercase font-bold tracking-tight">
              Active SCADA Anomaly Queue
            </span>
            <span className="font-label-code text-label-code px-2 py-0.5 bg-surface text-on-surface-variant uppercase font-semibold">
              {filteredAlerts.length} Anomalies Logged
            </span>
          </div>
          <div className="font-label-meta text-label-meta text-tertiary uppercase font-semibold">
            SORT: AI RISK INDEX (DESC)
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container font-label-meta text-label-meta text-on-surface-variant uppercase tracking-wider border-b border-surface-variant">
                <th className="py-2.5 px-3">Sev</th>
                <th className="py-2.5 px-3">Asset ID</th>
                <th className="py-2.5 px-3">Class / Node</th>
                <th className="py-2.5 px-3">Sensor Exception / Primary Trigger</th>
                <th className="py-2.5 px-3 text-right">Risk Index</th>
                <th className="py-2.5 px-3 text-right">Lag</th>
                <th className="py-2.5 px-3 text-right">Timestamp</th>
                <th className="py-2.5 px-3 text-center">Inspect</th>
              </tr>
            </thead>
            <tbody className="font-body-sm text-body-sm divide-y divide-surface-container">
              {filteredAlerts.map((alert) => {
                const isSelected = selectedAlertId === alert.id;
                const isCrit = alert.severity === 'CRIT';
                const isHigh = alert.severity === 'HIGH';
                const isDegrad = alert.severity === 'DEGRAD';

                return (
                  <tr
                    key={alert.id}
                    onClick={() => setSelectedAlertId(alert.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-primary-fixed/35 border-l-4 border-primary font-medium'
                        : 'hover:bg-surface-container-low border-l-4 border-transparent'
                    }`}
                  >
                    <td className="py-2.5 px-3 align-middle">
                      <span
                        className={`px-1.5 py-0.5 font-label-code text-label-code uppercase font-bold ${
                          isCrit
                            ? 'bg-error text-on-error'
                            : isHigh
                            ? 'bg-primary text-on-primary'
                            : isDegrad
                            ? 'bg-surface-variant text-on-surface-variant'
                            : 'bg-surface-container-high text-on-surface-variant'
                        }`}
                      >
                        {alert.severity}
                      </span>
                    </td>

                    <td className="py-2.5 px-3 align-middle font-headline-sm text-body-md font-bold text-on-surface">
                      {alert.assetId === 'TX-Oak-04' ? 'TX-04' : alert.assetId}
                    </td>

                    <td className="py-2.5 px-3 align-middle font-semibold text-on-surface whitespace-nowrap">
                      {alert.classNode.split('•')[0].trim()}
                    </td>

                    <td className="py-2.5 px-3 align-middle font-body-sm text-body-sm text-on-surface">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            isCrit ? 'bg-error' : isHigh ? 'bg-primary' : isDegrad ? 'bg-tertiary' : 'bg-secondary'
                          }`}
                        ></span>
                        <span className={isCrit ? 'font-semibold text-error' : 'font-medium'}>
                          {alert.primaryTrigger}
                        </span>
                      </div>
                    </td>

                    <td
                      className={`py-2.5 px-3 align-middle text-right font-telemetry-num text-telemetry-num font-bold ${
                        isCrit ? 'text-error' : isHigh ? 'text-primary' : 'text-on-surface'
                      }`}
                    >
                      {alert.riskIndex}
                    </td>

                    <td
                      className={`py-2.5 px-3 align-middle text-right font-telemetry-num text-telemetry-num ${
                        isDegrad ? 'text-error font-semibold' : 'text-secondary font-semibold'
                      }`}
                    >
                      {alert.lag}
                    </td>

                    <td className="py-2.5 px-3 align-middle text-right font-telemetry-num text-telemetry-num text-on-surface-variant whitespace-nowrap">
                      {alert.timestamp}
                    </td>

                    <td className="py-2.5 px-3 align-middle text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToAsset(alert.assetId);
                        }}
                        className="p-1 bg-surface-container hover:bg-surface-container-high text-on-surface inline-flex items-center justify-center cursor-pointer border border-outline-variant"
                        title="Inspect Asset in Assets Page"
                      >
                        <span className="material-symbols-outlined text-[1rem]">arrow_forward</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Substation Map Ticker Strip */}
        <div className="p-space-md bg-surface-container-low flex flex-col xl:flex-row items-center justify-between gap-space-sm mt-auto border-t border-surface-variant">
          <div className="flex items-center gap-3">
            <img
              src="/transformer.jpg"
              alt="Substation Transformer"
              className="w-16 h-11 object-cover shrink-0 shadow-xs border border-outline-variant rounded-xs"
            />
            <div>
              <div className="font-label-code text-label-code text-on-surface font-bold uppercase">
                NORTH SUBSTATION COMPOUND (BAY 04-B)
              </div>
              <p className="font-label-meta text-label-meta text-on-surface-variant uppercase">
                Active alerts co-located on 138kV Step-Down Transformer TX-04 Bus #2
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-label-code text-label-code px-2 py-1 bg-surface text-on-surface uppercase font-semibold border border-outline-variant">
              BUS 2 VOLTAGE: 137.8 kV
            </span>
            <span className="font-label-code text-label-code px-2 py-1 bg-surface text-secondary uppercase font-semibold border border-outline-variant">
              INTERLOCK: NORMAL
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          4. ACTIVE INCIDENT DOSSIER (HORIZONTAL LAYOUT UNDERNEATH TABLE)
         ========================================================================= */}
      <div className="w-full flex flex-col bg-surface-container-lowest shadow-md overflow-hidden border border-surface-variant">
        {/* Full-Width Dossier Header Bar */}
        <div className="bg-inverse-surface text-inverse-on-surface p-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="material-symbols-outlined text-secondary-fixed text-[1.5rem]">
              assignment
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-label-code text-label-code text-secondary-fixed uppercase tracking-wider font-bold">
                  ACTIVE INCIDENT DOSSIER
                </span>
                <span className="text-tertiary-fixed-dim">•</span>
                <span className="font-headline-sm text-headline-sm text-inverse-on-surface font-bold">
                  {selectedAlert.id}
                </span>
              </div>
              <div className="font-label-meta text-[0.75rem] text-tertiary-fixed-dim uppercase">
                EQUIPMENT: <strong className="text-white">{selectedAlert.assetId === 'TX-Oak-04' ? 'TX-04' : selectedAlert.assetId}</strong> (138kV/13.8kV Step-Down Transformer) • LOCATION: {selectedAlert.classNode}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-space-sm flex-wrap self-start sm:self-auto">
            <span className="font-label-code text-label-code text-tertiary-fixed-dim px-2 py-1 bg-surface-container/20 border border-outline-variant/30">
              PRIORITY: {selectedAlert.priority}
            </span>
            <span
              className={`font-label-code text-label-code px-2.5 py-1 font-bold uppercase tracking-widest shadow-xs ${
                selectedAlert.severity === 'CRIT'
                  ? 'bg-error text-on-error'
                  : selectedAlert.severity === 'HIGH'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-variant text-on-surface'
              }`}
            >
              {selectedAlert.severityLabel} RISK • URGENT
            </span>
          </div>
        </div>

        {/* Horizontal 3-Column Body Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg p-space-lg items-stretch">
          {/* COLUMN 1: TRANSFORMER PHOTO & HARDWARE NAMEPLATE SPECS (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-space-md">
            <div>
              <div className="relative w-full h-48 bg-surface-container overflow-hidden rounded-xs border border-outline-variant shadow-xs">
                <img
                  className="w-full h-full object-cover"
                  alt="High Voltage Step-Down Transformer TX-04"
                  src="/transformer.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/85 via-transparent to-transparent flex items-end p-2.5">
                  <span className="font-label-code text-[0.6875rem] text-inverse-on-surface px-1.5 py-0.5 bg-inverse-surface/90 border border-outline/30 uppercase font-bold">
                    {selectedAlert.assetId === 'TX-Oak-04' ? 'TX-04' : selectedAlert.assetId} • 138kV/13.8kV STEP-DOWN
                  </span>
                </div>
              </div>

              {/* Transformer Technical Nameplate Specs */}
              <div className="mt-space-sm grid grid-cols-2 gap-2 font-label-code text-[0.6875rem]">
                <div className="p-2 bg-surface-container-low border border-surface-variant/40">
                  <div className="text-tertiary uppercase text-[0.625rem]">Rating</div>
                  <div className="font-bold text-on-surface">45.0 / 50.0 MVA</div>
                </div>
                <div className="p-2 bg-surface-container-low border border-surface-variant/40">
                  <div className="text-tertiary uppercase text-[0.625rem]">Serial Number</div>
                  <div className="font-bold text-on-surface truncate">
                    {selectedAlert.serialNumber || 'WEC-138-50MVA-2018'}
                  </div>
                </div>
                <div className="p-2 bg-surface-container-low border border-surface-variant/40">
                  <div className="text-tertiary uppercase text-[0.625rem]">Dielectric Fluid</div>
                  <div className="font-bold text-on-surface">14,200 L (Type II)</div>
                </div>
                <div className="p-2 bg-surface-container-low border border-surface-variant/40">
                  <div className="text-tertiary uppercase text-[0.625rem]">Cooling Stages</div>
                  <div className="font-bold text-error">Stage 2 Lockout</div>
                </div>
              </div>
            </div>

            <div className="p-2 bg-surface-container text-tertiary font-label-meta text-[0.6875rem] uppercase border border-surface-variant/40 flex items-center justify-between">
              <span>COMMISSIONED: 2014-Q3</span>
              <span>AGE: 10.4 YRS</span>
            </div>
          </div>

          {/* COLUMN 2: ANOMALY NARRATIVE, ROOT CAUSE & AI RECOMMENDATION (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-space-md">
            <div className="space-y-space-sm">
              <div className="flex items-center gap-1.5 text-primary font-label-code text-label-code font-bold uppercase">
                <span className="material-symbols-outlined text-[1.125rem]">neurology</span>
                <span>Transformer Diagnostic Attribution</span>
              </div>

              {/* Anomaly Narrative Box */}
              <div className="p-space-md bg-surface-container-low border border-surface-variant/40 space-y-1">
                <span className="font-label-meta text-[0.6875rem] text-tertiary uppercase font-bold tracking-wider block">
                  Incident Narrative
                </span>
                <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                  Dual-threshold breach detected on 138kV Step-Down Transformer. Winding oil temperature rate-of-rise (+1.8°C/10min) with simultaneous zero-speed tachometer signal from auxiliary cooling fan bank #2. Unit thermal buffer degraded by 68%.
                </p>
                <div className="pt-2 mt-2 border-t border-surface-variant/40 flex items-center justify-between font-label-code text-[0.6875rem]">
                  <span className="text-tertiary uppercase">Primary Failure Mode:</span>
                  <span className="text-error font-bold uppercase">Accelerated Insulation Pyrolysis</span>
                </div>
              </div>

              {/* Recommended Action Card */}
              <div className="p-space-md bg-primary-fixed/20 border-l-4 border-primary space-y-1">
                <div className="flex items-center gap-1.5 font-label-code text-label-code text-primary font-bold uppercase">
                  <span className="material-symbols-outlined text-[1rem]">psychology</span>
                  <span>Recommended Mitigation</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface leading-snug">
                  Initiate dynamic load shedding or feeder tie transfer via Line 14A/B intertie to relieve <strong className="text-primary font-bold">8.5 MVA</strong> within 35 minutes to prevent irreversible insulation loss or automatic thermal breaker trip.
                </p>
                <div className="pt-1 flex items-center justify-between font-label-code text-[0.6875rem] text-secondary">
                  <span>ESTIMATED BENEFIT:</span>
                  <span className="font-bold">-11.2°C OIL TEMP DROP IN 35 MIN</span>
                </div>
              </div>
            </div>

            <div className="p-2 bg-surface-container-low text-tertiary font-label-meta text-[0.6875rem] uppercase border border-surface-variant/40 flex items-center justify-between">
              <span>MODEL CONFIDENCE: 94.2%</span>
              <span className="text-secondary font-bold">SOP-TX-10 APPLIES</span>
            </div>
          </div>

          {/* COLUMN 3: CRITICAL TELEMETRY METRICS & DISPATCH ACTIONS (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-space-md">
            <div>
              <span className="font-label-meta text-label-meta text-tertiary uppercase font-bold tracking-wider mb-2 block">
                Critical Sensor Telemetry
              </span>

              {/* 3 Telemetry Cards */}
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2.5 bg-error-container/30 flex flex-col border border-error/20">
                  <span className="font-label-meta text-[0.625rem] text-on-surface-variant uppercase truncate">
                    Top-Oil Temp
                  </span>
                  <span className="font-display text-[1.5rem] leading-tight font-bold text-error mt-0.5">
                    {selectedAlert.topOil !== null ? selectedAlert.topOil : '94.2'}
                    <span className="text-body-sm">°C</span>
                  </span>
                  <span className="font-label-meta text-[0.625rem] text-error font-semibold mt-1">
                    CEIL: 85.0°C (+9.2)
                  </span>
                </div>

                <div className="p-2.5 bg-surface-container flex flex-col border border-surface-variant">
                  <span className="font-label-meta text-[0.625rem] text-on-surface-variant uppercase truncate">
                    Dissolved H₂
                  </span>
                  <span className="font-display text-[1.5rem] leading-tight font-bold text-primary mt-0.5">
                    {selectedAlert.h2Ppm || '185'}
                    <span className="text-body-sm">ppm</span>
                  </span>
                  <span className="font-label-meta text-[0.625rem] text-on-surface-variant mt-1">
                    IEEE: 200ppm
                  </span>
                </div>

                <div className="p-2.5 bg-surface-container flex flex-col border border-surface-variant">
                  <span className="font-label-meta text-[0.625rem] text-on-surface-variant uppercase truncate">
                    Active Load
                  </span>
                  <span className="font-display text-[1.5rem] leading-tight font-bold text-on-surface mt-0.5">
                    {selectedAlert.activeLoad || '44.2'}
                    <span className="text-body-sm">MVA</span>
                  </span>
                  <span className="font-label-meta text-[0.625rem] text-error font-semibold mt-1">
                    {selectedAlert.loadPct || '98.4'}% OF 45 MVA
                  </span>
                </div>
              </div>

              {/* Inline Temperature Trajectory SVG Chart */}
              <div className="mt-3 p-2.5 bg-surface-container-low border border-surface-variant">
                <div className="flex items-center justify-between font-label-meta text-[0.6875rem] text-on-surface-variant uppercase mb-1">
                  <span>Oil Temperature Trajectory (Last 60 Min)</span>
                  <span className="text-error font-bold">+10.8°C ACCELERATION</span>
                </div>
                <svg className="w-full h-9 text-error overflow-visible" viewBox="0 0 300 35">
                  <line x1="0" y1="16" x2="300" y2="16" stroke="currentColor" strokeDasharray="3,3" strokeOpacity="0.3" strokeWidth="1" />
                  <path d="M 0,30 L 40,28 L 80,27 L 120,25 L 160,23 L 200,18 L 240,12 L 270,8 L 300,4" fill="none" stroke="currentColor" strokeWidth="2.5" />
                  <circle cx="300" cy="4" r="3.5" fill="currentColor" />
                </svg>
                <div className="flex items-center justify-between font-label-meta text-[0.625rem] text-tertiary mt-1">
                  <span>13:30 (83.4°C)</span>
                  <span>14:00 (Fan #2 Trip)</span>
                  <span className="text-error font-bold">14:31 (94.2°C)</span>
                </div>
              </div>
            </div>

            {/* Action Buttons Panel */}
            <div className="flex flex-col gap-2 pt-space-xs">
              <button
                onClick={() => navigateToSimulation(selectedAlert.assetId, 'TX-Pine-02', 8.5)}
                className="w-full py-2 px-3 bg-inverse-surface hover:bg-primary text-on-primary font-headline-sm text-body-md uppercase font-semibold flex items-center justify-between transition-colors cursor-pointer shadow-xs"
              >
                <span>Launch in Load Redistribution Simulator</span>
                <span className="material-symbols-outlined text-[1.25rem]">tune</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => navigateToAsset(selectedAlert.assetId)}
                  className="py-1.5 px-3 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-code text-[0.6875rem] uppercase transition-colors text-center border border-outline-variant cursor-pointer font-bold"
                >
                  Inspect Asset Details →
                </button>
                <button
                  onClick={handleSilenceAudio}
                  className="py-1.5 px-3 bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-label-code text-[0.6875rem] uppercase transition-colors text-center border border-outline-variant cursor-pointer"
                >
                  Silence Alert (Audio)
                </button>
              </div>

              <div className="flex items-center gap-1.5 p-1.5 bg-surface-container text-tertiary font-label-meta text-[0.625rem] uppercase border border-surface-variant/40">
                <span className="material-symbols-outlined text-primary text-[0.875rem]">lock</span>
                <span>SCADA Interlock: Manual breaker trip requires dual-operator key.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
