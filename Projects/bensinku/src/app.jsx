// app.jsx — BENSIN_KU root + tab nav + sheet orchestrator + responsive frame
import React, { useState as useS, useEffect as useE } from 'react'
import { VEHICLES, FUEL_LOGS, MAINTENANCE, fmtIDR, fmtIDRfull, fmtDate, fmtDateShort } from './data.jsx'
import { IOSDevice } from './ios-frame.jsx'
import { useTweaks, TweaksPanel, TweakSection, TweakColor, TweakToggle, TweakRadio, TweakButton } from './tweaks-panel.jsx'
import {
  LoginScreen, DashboardScreen, HistoryScreen, GarageScreen, MaintenanceScreen,
  ChoiceSheet, ScanSheet, FuelLogSheet, FuelLogActionsSheet, ConfirmSheet,
  AddVehicleSheet, AddMaintenanceSheet, VehicleActionsSheet, SuccessToast,
} from './screens.jsx'
import { IconHome, IconHistory, IconPlus, IconGarage, IconWrench } from './icons.jsx'

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#C8E441",
  "showLogin": false,
  "dark": false,
  "showFrame": "auto"
}/*EDITMODE-END*/;

// Map a chosen accent hex to the matching ink/deep tones
const ACCENT_MAP = {
  '#C8E441': { deep: '#8FAA1F', ink: '#0F1A02' }, // lime
  '#FF9E45': { deep: '#D87211', ink: '#3A1F08' }, // orange
  '#7BB4FF': { deep: '#3F7FDB', ink: '#0A1F3A' }, // blue
  '#F4A6CB': { deep: '#C36493', ink: '#3A0F22' }, // pink
};

function TabBar({ tab, onChange, onAdd }) {
  const items = [
    { id: 'home',        icon: IconHome,    label: 'Beranda' },
    { id: 'history',     icon: IconHistory, label: 'Riwayat' },
    { id: 'add',         icon: IconPlus,    label: '',        special: true },
    { id: 'garage',      icon: IconGarage,  label: 'Garasi' },
    { id: 'maintenance', icon: IconWrench,  label: 'Servis' },
  ];
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      padding: '10px 12px 38px',
      background: 'linear-gradient(180deg, rgba(239,234,224,0) 0%, var(--bg) 30%)',
      pointerEvents: 'none', zIndex: 50,
    }}>
      <div style={{
        pointerEvents: 'auto',
        background: 'var(--surface)', borderRadius: 24,
        border: '1px solid var(--stroke)',
        boxShadow: '0 10px 28px rgba(23,22,20,0.10), 0 2px 4px rgba(23,22,20,0.04)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 14px',
        height: 64,
      }}>
        {items.map(it => {
          const I = it.icon;
          const active = tab === it.id;
          if (it.special) {
            return (
              <button key={it.id} onClick={onAdd} style={{
                width: 54, height: 54, borderRadius: 18,
                background: 'var(--ink)', color: 'var(--accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginTop: -22,
                boxShadow: '0 10px 22px rgba(23,22,20,0.22), inset 0 0 0 3px var(--surface)',
              }}>
                <IconPlus size={26} sw={2.4} />
              </button>
            );
          }
          return (
            <button key={it.id} onClick={() => onChange(it.id)} style={{
              flex: 1, height: 50, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 2,
              color: active ? 'var(--ink)' : 'var(--ink-mute)',
            }}>
              <I size={22} sw={active ? 2 : 1.7} />
              <span style={{ fontSize: 10, fontWeight: active ? 700 : 500 }}>{it.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Sheet({ open, children, onClose, dark }) {
  if (!open) return null;
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 80,
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      animation: 'fadeIn .18s ease-out',
    }}>
      <div onClick={onClose} style={{
        position: 'absolute', inset: 0, background: 'rgba(10,10,8,0.45)',
        backdropFilter: 'blur(2px)',
      }}/>
      <div style={{
        position: 'relative',
        background: dark ? '#0A0A08' : 'var(--bg)',
        borderRadius: '24px 24px 0 0',
        animation: 'sheetIn .28s cubic-bezier(.2,.8,.2,1)',
        maxHeight: '92%',
        boxShadow: '0 -10px 30px rgba(0,0,0,0.18)',
      }}>
        {children}
      </div>
    </div>
  );
}

function AppShell() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const accentExtras = ACCENT_MAP[t.accent] || ACCENT_MAP['#C8E441'];

  // Apply accent palette to CSS vars
  useE(() => {
    const r = document.documentElement.style;
    r.setProperty('--accent', t.accent);
    r.setProperty('--accent-deep', accentExtras.deep);
    r.setProperty('--accent-ink', accentExtras.ink);
  }, [t.accent]);

  // Dark mode
  useE(() => {
    const r = document.documentElement.style;
    if (t.dark) {
      r.setProperty('--bg', '#171614');
      r.setProperty('--ink', '#F4F1E8');
      r.setProperty('--ink-dim', 'rgba(244,241,232,0.7)');
      r.setProperty('--ink-mute', 'rgba(244,241,232,0.5)');
      r.setProperty('--ink-faint', 'rgba(244,241,232,0.2)');
      r.setProperty('--surface', '#252320');
      r.setProperty('--stroke', 'rgba(244,241,232,0.10)');
      r.setProperty('--stroke-strong', 'rgba(244,241,232,0.22)');
    } else {
      r.setProperty('--bg', '#EFEAE0');
      r.setProperty('--ink', '#171614');
      r.setProperty('--ink-dim', 'rgba(23,22,20,0.66)');
      r.setProperty('--ink-mute', 'rgba(23,22,20,0.42)');
      r.setProperty('--ink-faint', 'rgba(23,22,20,0.18)');
      r.setProperty('--surface', '#FFFDF7');
      r.setProperty('--stroke', 'rgba(23,22,20,0.10)');
      r.setProperty('--stroke-strong', 'rgba(23,22,20,0.18)');
    }
  }, [t.dark]);

  // App state
  const [loggedIn, setLoggedIn] = useS(!t.showLogin);
  useE(() => { setLoggedIn(!t.showLogin); }, [t.showLogin]);

  const [tab, setTab] = useS('home');
  const [vehicles, setVehicles] = useS(VEHICLES);
  const [vehicleId, setVehicleId] = useS('civic');
  const vehicle = vehicles.find(v => v.id === vehicleId) || vehicles[0];

  const [fuelLogs, setFuelLogs] = useS(FUEL_LOGS);
  const [maintLogs, setMaintLogs] = useS(MAINTENANCE);

  // Sheet flow
  const [sheet, setSheet] = useS(null);
  const [actionVehicle, setActionVehicle] = useS(null);
  const [actionLog, setActionLog] = useS(null);
  const [toast, setToast] = useS(null);

  // Decide whether to wrap in iOS frame (desktop) or full-bleed (real phone)
  const [framed, setFramed] = useS(true);
  useE(() => {
    const decide = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (t.showFrame === 'on') return setFramed(true);
      if (t.showFrame === 'off') return setFramed(false);
      setFramed(w >= 520 && h >= 720);
    };
    decide();
    window.addEventListener('resize', decide);
    return () => window.removeEventListener('resize', decide);
  }, [t.showFrame]);

  const switchVehicle = () => {
    const idx = vehicles.findIndex(v => v.id === vehicleId);
    const next = vehicles[(idx + 1) % vehicles.length];
    setVehicleId(next.id);
  };

  // Helper: compute avgKmL for a vehicle from a log list
  const computeAvgKmL = (vid, logs) => {
    const vLogs = logs.filter(l => (l.vehicleId || 'civic') === vid && typeof l.kmL === 'number' && l.kmL > 0);
    return vLogs.length ? parseFloat((vLogs.reduce((s, l) => s + l.kmL, 0) / vLogs.length).toFixed(1)) : null;
  };

  // Per-vehicle filtered logs (fallback: treat legacy logs without vehicleId as civic)
  const vehicleLogs = fuelLogs.filter(l => (l.vehicleId || 'civic') === vehicleId);

  const renderScreen = () => {
    switch (tab) {
      case 'home':        return <DashboardScreen vehicle={vehicle} logs={vehicleLogs} onSwitchVehicle={switchVehicle} onOpenAdd={() => setSheet('choice')} onNavigate={setTab} />;
      case 'history':     return (
        <HistoryScreen
          logs={vehicleLogs}
          onLogMenu={(log) => { setActionLog(log); setSheet('log-actions'); }}
        />
      );
      case 'garage':      return (
        <GarageScreen
          vehicles={vehicles}
          activeVehicleId={vehicleId}
          allLogs={fuelLogs}
          onSelect={setVehicleId}
          onAdd={() => setSheet('add-vehicle')}
          onMenu={(v) => { setActionVehicle(v); setSheet('vehicle-actions'); }}
          onDelete={(v) => {
            setActionVehicle(v);
            if (vehicles.length > 1) setSheet('confirm-delete-vehicle');
            else setToast({ title: 'Tidak bisa dihapus', sub: 'Minimal harus ada 1 kendaraan' });
          }}
        />
      );
      case 'maintenance': return (
        <MaintenanceScreen
          logs={maintLogs}
          vehicle={vehicle}
          onAdd={() => setSheet('add-maintenance')}
        />
      );
      default:            return null;
    }
  };

  const handleSaveFuel = (log) => {
    const logWithVehicle = { ...log, vehicleId: log.vehicleId || vehicleId };
    const wasEdit = fuelLogs.some(l => l.id === log.id);
    const updatedLogs = wasEdit
      ? fuelLogs.map(l => l.id === log.id ? logWithVehicle : l)
      : [logWithVehicle, ...fuelLogs];
    setFuelLogs(updatedLogs);
    // Recompute avgKmL and odometer for the active vehicle
    const newAvg = computeAvgKmL(vehicleId, updatedLogs);
    setVehicles(list => list.map(v => {
      if (v.id !== vehicleId) return v;
      return {
        ...v,
        odometer: log.odo && log.odo > v.odometer ? log.odo : v.odometer,
        ...(newAvg !== null && { avgKmL: newAvg }),
      };
    }));
    setSheet(null);
    setActionLog(null);
    setToast({
      title: wasEdit
        ? `Catatan diperbarui`
        : `Tersimpan! ${log.liters.toFixed(1)}L · ${fmtIDR(log.total)}`,
      sub: wasEdit ? 'Perubahan disimpan' : (log.source === 'scan' ? 'Dari hasil scan struk' : 'Input manual'),
    });
    if (!wasEdit) setTab('history');
  };

  const handleDeleteFuel = () => {
    if (!actionLog) return;
    const removed = actionLog;
    const updatedLogs = fuelLogs.filter(l => l.id !== removed.id);
    setFuelLogs(updatedLogs);
    // Recompute avgKmL for the vehicle that owned this log
    const ownerVid = removed.vehicleId || vehicleId;
    const newAvg = computeAvgKmL(ownerVid, updatedLogs);
    if (newAvg !== null) {
      setVehicles(list => list.map(v => v.id === ownerVid ? { ...v, avgKmL: newAvg } : v));
    }
    setSheet(null);
    setActionLog(null);
    setToast({ title: 'Catatan dihapus', sub: `${removed.brand} · ${removed.liters.toFixed(1)}L` });
  };

  const handleSaveVehicle = (v) => {
    const wasEdit = vehicles.some(x => x.id === v.id);
    setVehicles(list => {
      const idx = list.findIndex(x => x.id === v.id);
      if (idx >= 0) {
        const next = list.slice();
        next[idx] = v;
        return next;
      }
      return [...list, v];
    });
    if (!wasEdit) setVehicleId(v.id);
    setSheet(null);
    setActionVehicle(null);
    setToast({
      title: wasEdit ? `${v.make} ${v.model} diperbarui` : `${v.make} ${v.model} ditambahkan`,
      sub: wasEdit ? 'Perubahan disimpan' : 'Sekarang jadi kendaraan aktif',
    });
  };

  const handleSetActive = () => {
    if (!actionVehicle) return;
    setVehicleId(actionVehicle.id);
    setSheet(null);
    setToast({ title: `${actionVehicle.make} ${actionVehicle.model} aktif`, sub: 'Dashboard akan pakai kendaraan ini' });
  };

  const handleConfirmDeleteVehicle = () => {
    if (!actionVehicle) return;
    const removed = actionVehicle;
    setVehicles(list => {
      const next = list.filter(v => v.id !== removed.id);
      if (vehicleId === removed.id && next.length) setVehicleId(next[0].id);
      return next;
    });
    setSheet(null);
    setActionVehicle(null);
    setToast({ title: `${removed.make} ${removed.model} dihapus`, sub: 'Kendaraan & data terkait telah dihapus' });
  };

  const handleSaveMaintenance = (m) => {
    setMaintLogs(list => [m, ...list]);
    setSheet(null);
    setToast({
      title: 'Servis tercatat',
      sub: `${m.items.length} item · ${fmtIDR(m.cost)}`,
    });
  };

  const phoneScreen = (
    <div style={{
      width: '100%', height: '100%',
      background: 'var(--bg)', color: 'var(--ink)',
      display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Top safe area — clear iOS status bar / dynamic island when framed */}
      {framed && <div style={{ height: 58, flexShrink: 0 }}/>}
      {!framed && <div style={{ height: 'env(safe-area-inset-top, 0)' }}/>}

      {!loggedIn ? (
        <div className="scroll-area" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <LoginScreen onLogin={() => { setLoggedIn(true); setTweak('showLogin', false); }} />
        </div>
      ) : (
        <>
          <div className="scroll-area" key={tab}>{renderScreen()}</div>
          <TabBar tab={tab} onChange={setTab} onAdd={() => setSheet('choice')} />
          <Sheet open={sheet === 'choice'} onClose={() => setSheet(null)}>
            <ChoiceSheet
              onScan={() => setSheet('scan')}
              onManual={() => setSheet('manual')}
              onClose={() => setSheet(null)}
            />
          </Sheet>
          <Sheet open={sheet === 'scan'} onClose={() => setSheet('choice')} dark>
            <ScanSheet
              onResult={() => setSheet('review')}
              onClose={() => setSheet('choice')}
            />
          </Sheet>
          <Sheet open={sheet === 'review'} onClose={() => setSheet(null)}>
            <FuelLogSheet
              mode="scan"
              vehicle={vehicle}
              lastOdo={fuelLogs[0]?.odo || vehicle?.odometer}
              onSave={handleSaveFuel}
              onClose={() => setSheet(null)}
            />
          </Sheet>
          <Sheet open={sheet === 'manual'} onClose={() => setSheet(null)}>
            <FuelLogSheet
              mode="manual"
              vehicle={vehicle}
              lastOdo={fuelLogs[0]?.odo || vehicle?.odometer}
              onSave={handleSaveFuel}
              onClose={() => setSheet(null)}
            />
          </Sheet>
          <Sheet open={sheet === 'edit-log'} onClose={() => { setSheet(null); setActionLog(null); }}>
            <FuelLogSheet
              mode="edit"
              existing={actionLog}
              vehicle={vehicle}
              lastOdo={null}
              onSave={handleSaveFuel}
              onClose={() => { setSheet(null); setActionLog(null); }}
            />
          </Sheet>
          <Sheet open={sheet === 'log-actions'} onClose={() => { setSheet(null); setActionLog(null); }}>
            <FuelLogActionsSheet
              log={actionLog}
              onEdit={() => setSheet('edit-log')}
              onDelete={() => setSheet('confirm-delete-log')}
              onClose={() => { setSheet(null); setActionLog(null); }}
            />
          </Sheet>
          <Sheet open={sheet === 'confirm-delete-log'} onClose={() => setSheet('log-actions')}>
            <ConfirmSheet
              title="Hapus catatan ini?"
              body={actionLog ? `${actionLog.brand} · ${actionLog.liters.toFixed(1)}L · ${fmtIDRfull(actionLog.total)} pada ${fmtDate(actionLog.date)} akan dihapus permanen.` : ''}
              confirmLabel="Ya, hapus"
              onConfirm={handleDeleteFuel}
              onClose={() => setSheet('log-actions')}
            />
          </Sheet>
          <Sheet open={sheet === 'add-vehicle'} onClose={() => setSheet(null)}>
            <AddVehicleSheet onSave={handleSaveVehicle} onClose={() => setSheet(null)} />
          </Sheet>
          <Sheet open={sheet === 'edit-vehicle'} onClose={() => { setSheet(null); setActionVehicle(null); }}>
            <AddVehicleSheet
              existing={actionVehicle}
              onSave={handleSaveVehicle}
              onClose={() => { setSheet(null); setActionVehicle(null); }}
            />
          </Sheet>
          <Sheet open={sheet === 'vehicle-actions'} onClose={() => { setSheet(null); setActionVehicle(null); }}>
            <VehicleActionsSheet
              vehicle={actionVehicle}
              isActive={actionVehicle?.id === vehicleId}
              canDelete={vehicles.length > 1}
              onSetActive={handleSetActive}
              onEdit={() => setSheet('edit-vehicle')}
              onDelete={() => setSheet('confirm-delete-vehicle')}
              onClose={() => { setSheet(null); setActionVehicle(null); }}
            />
          </Sheet>
          <Sheet open={sheet === 'confirm-delete-vehicle'} onClose={() => setSheet('vehicle-actions')}>
            <ConfirmSheet
              title={`Hapus ${actionVehicle?.make} ${actionVehicle?.model}?`}
              body="Semua data isi bensin & riwayat servis terkait kendaraan ini akan ikut terhapus. Aksi ini tidak dapat dibatalkan."
              confirmLabel="Ya, hapus"
              onConfirm={handleConfirmDeleteVehicle}
              onClose={() => setSheet('vehicle-actions')}
            />
          </Sheet>
          <Sheet open={sheet === 'add-maintenance'} onClose={() => setSheet(null)}>
            <AddMaintenanceSheet vehicle={vehicle} onSave={handleSaveMaintenance} onClose={() => setSheet(null)} />
          </Sheet>
          {toast && <SuccessToast title={toast.title} sub={toast.sub} onDone={() => setToast(null)} />}
        </>
      )}
    </div>
  );

  const stage = (
    <div className={'stage ' + (framed ? '' : 'bare')}>
      {framed
        ? <IOSDevice width={402} height={874} dark={false}>{phoneScreen}</IOSDevice>
        : <div style={{ width: '100%', height: '100%' }}>{phoneScreen}</div>
      }
    </div>
  );

  return (
    <>
      {stage}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme">
          <TweakColor
            label="Accent"
            value={t.accent}
            options={['#C8E441','#FF9E45','#7BB4FF','#F4A6CB']}
            onChange={v => setTweak('accent', v)}
          />
          <TweakToggle label="Dark mode" value={t.dark} onChange={v => setTweak('dark', v)} />
        </TweakSection>
        <TweakSection label="Flow">
          <TweakToggle
            label="Mulai dari Login"
            value={t.showLogin}
            onChange={v => { setTweak('showLogin', v); setLoggedIn(!v); }}
          />
          <TweakRadio
            label="Frame"
            value={t.showFrame}
            options={[
              { value: 'auto', label: 'Auto' },
              { value: 'on',   label: 'Bingkai' },
              { value: 'off',  label: 'Lebar' },
            ]}
            onChange={v => setTweak('showFrame', v)}
          />
        </TweakSection>
        <TweakSection label="Aksi cepat">
          <TweakButton label="Buka layar Scan"       onClick={() => { setLoggedIn(true); setSheet('scan'); }}/>
          <TweakButton label="Buka verifikasi OCR"   onClick={() => { setLoggedIn(true); setSheet('review'); }} secondary/>
          <TweakButton label="Input manual"          onClick={() => { setLoggedIn(true); setSheet('manual'); }} secondary/>
          <TweakButton label="Tambah kendaraan"      onClick={() => { setLoggedIn(true); setTab('garage'); setSheet('add-vehicle'); }} secondary/>
          <TweakButton label="Catat servis baru"     onClick={() => { setLoggedIn(true); setTab('maintenance'); setSheet('add-maintenance'); }} secondary/>
          <TweakButton label="Mulai dari Login"      onClick={() => { setLoggedIn(false); }} secondary/>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

export { AppShell };
