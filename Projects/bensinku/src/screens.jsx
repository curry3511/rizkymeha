// screens.jsx — All BENSIN_KU screens
import React, { useState, useEffect, useRef, useMemo } from 'react'
import { VEHICLES, FUEL_LOGS, MAINTENANCE, UPCOMING_SERVICE, fmtIDR, fmtIDRfull, fmtDate, fmtDateShort } from './data.jsx'
import { IconHome, IconHistory, IconGarage, IconWrench, IconPlus, IconCamera, IconKey, IconChevR, IconChevD, IconClose, IconDrop, IconCheck, IconBolt, IconSpark, IconReceipt, IconCar, IconTrend, IconTrendDown, IconFilter, IconBell, IconSettings, IconTrash, IconDots, IconEdit, IconAlert, IconStar, IconFlash, IconGoogle, IconApple } from './icons.jsx'

// ─────────────────────────────────────────────────────────────
// Small shared pieces
// ─────────────────────────────────────────────────────────────

function ScreenHeader({ title, sub, right, big = false }) {
  return (
    <div style={{ padding: '8px 22px 14px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12 }}>
      <div style={{ minWidth: 0 }}>
        {sub && <div style={{ fontSize: 13, color: 'var(--ink-mute)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 4 }}>{sub}</div>}
        <h1 style={{ margin: 0, fontSize: big ? 34 : 28, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.05 }}>{title}</h1>
      </div>
      {right}
    </div>
  );
}

function CircleBtn({ children, onClick, dark = false, size = 40 }) {
  return (
    <button onClick={onClick} style={{
      width: size, height: size, borderRadius: 9999,
      background: dark ? 'var(--ink)' : 'var(--surface)',
      color: dark ? 'var(--surface)' : 'var(--ink)',
      border: '1px solid var(--stroke)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>{children}</button>
  );
}

function Pill({ active, children, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: '8px 14px', borderRadius: 9999, fontSize: 13, fontWeight: 600,
      background: active ? 'var(--ink)' : 'transparent',
      color: active ? 'var(--surface)' : 'var(--ink-dim)',
      border: active ? '1px solid var(--ink)' : '1px solid var(--stroke-strong)',
      whiteSpace: 'nowrap',
    }}>{children}</button>
  );
}

function Card({ children, style, onClick, dark }) {
  return (
    <div onClick={onClick} style={{
      background: dark ? 'var(--ink)' : 'var(--surface)',
      color: dark ? 'var(--surface)' : 'var(--ink)',
      borderRadius: 22,
      border: dark ? 'none' : '1px solid var(--stroke)',
      boxShadow: dark ? 'none' : '0 1px 0 rgba(23,22,20,0.03)',
      cursor: onClick ? 'pointer' : 'default',
      ...style,
    }}>{children}</div>
  );
}

// ─────────────────────────────────────────────────────────────
// LOGIN
// ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  return (
    <div className="screen-fade" style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      padding: '36px 24px 32px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Big logo composition */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ position: 'relative', marginBottom: 36 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '6px 12px', borderRadius: 9999,
            background: 'var(--ink)', color: 'var(--accent)',
            fontSize: 11, fontWeight: 700, letterSpacing: '0.18em',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: 9999, background: 'var(--accent)' }} />
            BBM TRACKER
          </div>
          <h1 style={{
            margin: '20px 0 0', fontSize: 56, lineHeight: 0.92,
            fontWeight: 800, letterSpacing: '-0.04em',
          }}>
            Bensin<span style={{ color: 'var(--accent-deep)' }}>_</span><br/>ku<span style={{ color: 'var(--ink-mute)' }}>.</span>
          </h1>
          <p style={{
            margin: '20px 0 0', fontSize: 16, color: 'var(--ink-dim)',
            lineHeight: 1.45, maxWidth: 320,
          }}>
            Catat tiap isi bensin dalam 30 detik. Tahu pasti mobilmu hemat atau boros.
          </p>
        </div>

        {/* Visual: a fake pump display */}
        <div style={{
          marginTop: 8, borderRadius: 22, padding: 22,
          background: '#0E0F0C',
          border: '1px solid #2a2c24',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
            <span className="mono" style={{ fontSize: 10, letterSpacing: '0.15em', color: '#888' }}>PERTAMAX · 92</span>
            <span className="mono" style={{ fontSize: 10, color: '#888' }}>14 MEI</span>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <div className="mono" style={{ fontSize: 9, color: '#666', letterSpacing: '0.12em' }}>LITER</div>
              <div className="mono" style={{ fontSize: 28, color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.02em' }}>38.20</div>
            </div>
            <div style={{ flex: 1 }}>
              <div className="mono" style={{ fontSize: 9, color: '#666', letterSpacing: '0.12em' }}>TOTAL · IDR</div>
              <div className="mono" style={{ fontSize: 28, color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.02em' }}>496.600</div>
            </div>
          </div>
        </div>
      </div>

      {/* Auth buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 28 }}>
        <button onClick={onLogin} style={{
          height: 56, borderRadius: 16, fontSize: 16, fontWeight: 600,
          background: 'var(--accent)', color: 'var(--accent-ink)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          boxShadow: '0 8px 18px rgba(143,170,31,0.28)',
        }}>
          <IconGoogle size={20} /> Lanjut dengan Google
        </button>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onLogin} style={{
            flex: 1, height: 56, borderRadius: 16, background: 'var(--ink)', color: 'var(--surface)',
            fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <IconApple size={18} /> Apple
          </button>
          <button onClick={onLogin} style={{
            flex: 1, height: 56, borderRadius: 16,
            background: 'transparent', border: '1px solid var(--stroke-strong)',
            fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <IconKey size={18} /> Email
          </button>
        </div>
        <div style={{ textAlign: 'center', fontSize: 11.5, color: 'var(--ink-mute)', marginTop: 12, lineHeight: 1.5 }}>
          Dengan masuk, kamu setuju dengan Ketentuan Layanan & Kebijakan Privasi.
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DASHBOARD — Home tab
// ─────────────────────────────────────────────────────────────
function StatusBanner({ status, value, prev, vehicle }) {
  const isHemat = status === 'hemat';
  const isBoros = status === 'boros';
  const bg    = isHemat ? 'var(--accent)' : isBoros ? 'var(--warn)' : 'var(--info)';
  const fg    = isHemat ? 'var(--accent-ink)' : isBoros ? '#3D1E0B' : '#fff';
  const label = isHemat ? 'Hemat' : isBoros ? 'Boros' : status === 'irit' ? 'Irit' : 'Normal';
  const hasDelta = prev > 0 && value > 0;
  const delta = hasDelta ? ((value - prev) / prev) * 100 : 0;
  return (
    <div style={{
      margin: '0 16px 16px', borderRadius: 24, overflow: 'hidden',
      background: bg, color: fg,
      position: 'relative',
    }}>
      {/* Subtle pattern */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.18, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(135deg, transparent 0 18px, currentColor 18px 19px)',
      }} />
      <div style={{ position: 'relative', padding: '18px 20px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 700, letterSpacing: '0.14em' }}>
            <IconBolt size={14} /> STATUS BULAN INI
          </div>
          <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.7 }}>{vehicle.make} {vehicle.model}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
          <div style={{
            fontSize: 64, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.9, textTransform: 'uppercase',
          }}>{label}</div>
          {hasDelta && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingBottom: 8 }}>
              {delta >= 0 ? <IconTrend size={18} sw={2.2}/> : <IconTrendDown size={18} sw={2.2}/>}
              <span className="mono" style={{ fontSize: 13, fontWeight: 700, marginTop: 4 }}>
                {delta > 0 ? '+' : ''}{delta.toFixed(1)}%
              </span>
            </div>
          )}
        </div>
        <div style={{ marginTop: 12, display: 'flex', gap: 18, fontSize: 13, fontWeight: 500 }}>
          <div>
            <div style={{ opacity: 0.65, fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', marginBottom: 2 }}>EFISIENSI</div>
            <div className="mono" style={{ fontSize: 16, fontWeight: 700 }}>
              {value > 0 ? <>{value.toFixed(1)} <span style={{ fontSize: 11 }}>km/L</span></> : '—'}
            </div>
          </div>
          <div style={{ width: 1, background: 'currentColor', opacity: 0.25 }} />
          <div>
            <div style={{ opacity: 0.65, fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', marginBottom: 2 }}>BULAN LALU</div>
            <div className="mono" style={{ fontSize: 16, fontWeight: 700 }}>
              {prev > 0 ? <>{prev.toFixed(1)} <span style={{ fontSize: 11 }}>km/L</span></> : '—'}
            </div>
          </div>
          <div style={{ width: 1, background: 'currentColor', opacity: 0.25 }} />
          <div>
            <div style={{ opacity: 0.65, fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', marginBottom: 2 }}>RATA-RATA</div>
            <div className="mono" style={{ fontSize: 16, fontWeight: 700 }}>
              {vehicle.avgKmL > 0 ? <>{vehicle.avgKmL.toFixed(1)} <span style={{ fontSize: 11 }}>km/L</span></> : '—'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SparkBars({ data, highlight = -1 }) {
  const max = Math.max(...data);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 56 }}>
      {data.map((v, i) => (
        <div key={i} style={{
          flex: 1, height: `${Math.max(6, (v / max) * 100)}%`,
          background: i === highlight ? 'var(--accent-deep)' : 'var(--ink)',
          opacity: i === highlight ? 1 : 0.18,
          borderRadius: 2,
        }} />
      ))}
    </div>
  );
}

function MonthlyChart({ data }) {
  const max = Math.max(...data.map(d => d.total)) || 1;
  const curIdx = data.length - 1;
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 130, padding: '12px 4px 0' }}>
        {data.map((d, i) => {
          const h = Math.max(d.total > 0 ? 4 : 0, (d.total / max) * 100);
          const isCur = i === curIdx;
          return (
            <div key={d.m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, height: '100%' }}>
              <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'flex-end' }}>
                <div style={{
                  width: '100%', height: `${h}%`,
                  background: isCur ? 'var(--accent)' : 'var(--ink)',
                  opacity: isCur ? 1 : 0.85,
                  borderRadius: '6px 6px 2px 2px',
                  position: 'relative',
                  border: isCur ? '1.5px dashed var(--accent-deep)' : 'none',
                  boxSizing: 'border-box',
                }}>
                  {isCur && d.total > 0 && (
                    <div style={{
                      position: 'absolute', top: -22, left: '50%', transform: 'translateX(-50%)',
                      background: 'var(--ink)', color: 'var(--surface)',
                      fontSize: 9, padding: '2px 5px', borderRadius: 4, fontWeight: 600,
                      whiteSpace: 'nowrap',
                    }} className="mono">{fmtIDR(d.total)}</div>
                  )}
                </div>
              </div>
              <div style={{ fontSize: 11, color: isCur ? 'var(--ink)' : 'var(--ink-mute)', fontWeight: isCur ? 700 : 500 }}>{d.m}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FuelLogRow({ log, onClick, onMenu }) {
  const isHemat = log.status === 'hemat';
  const isBoros = log.status === 'boros';
  const hasKmL = typeof log.kmL === 'number' && log.kmL > 0;
  return (
    <div onClick={() => onClick?.(log)} style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '14px 0', cursor: onClick ? 'pointer' : 'default',
      borderTop: '1px solid var(--stroke)',
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: isHemat ? 'var(--good-soft)' : isBoros ? 'var(--warn-soft)' : 'rgba(23,22,20,0.06)',
        color: isHemat ? 'var(--good)' : isBoros ? 'var(--warn)' : 'var(--ink-dim)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <IconDrop size={20} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 3 }}>
          <span style={{ fontWeight: 600, fontSize: 15 }}>{log.brand}</span>
          <span style={{ fontSize: 12, color: 'var(--ink-mute)' }} className="mono">{log.liters.toFixed(1)}L</span>
          {log.source === 'manual' && (
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em',
              padding: '2px 6px', borderRadius: 4,
              background: 'rgba(23,22,20,0.06)', color: 'var(--ink-mute)' }}>MANUAL</span>
          )}
        </div>
        <div style={{ fontSize: 12, color: 'var(--ink-dim)', display: 'flex', alignItems: 'center', gap: 6, overflow: 'hidden' }}>
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{log.station}</span>
          <span>·</span>
          <span style={{ whiteSpace: 'nowrap' }}>{fmtDateShort(log.date)}</span>
        </div>
      </div>
      <div style={{ textAlign: 'right', minWidth: 80 }}>
        <div className="mono" style={{ fontWeight: 700, fontSize: 15 }}>{fmtIDRfull(log.total).replace('Rp ','')}</div>
        <div style={{ fontSize: 11, color: 'var(--ink-mute)', marginTop: 2 }}>
          {hasKmL
            ? <><span className="mono">{log.kmL.toFixed(1)}</span> km/L</>
            : <span style={{ fontStyle: 'italic' }}>baru</span>}
        </div>
      </div>
      {onMenu && (
        <button onClick={e => { e.stopPropagation(); onMenu(log); }} style={{
          width: 28, height: 28, borderRadius: 9999,
          background: 'rgba(23,22,20,0.05)', color: 'var(--ink-dim)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          marginLeft: -4,
        }} aria-label="Aksi catatan">
          <IconDots size={16}/>
        </button>
      )}
    </div>
  );
}

function DashboardScreen({ vehicle, onOpenAdd, onSwitchVehicle, onNavigate, logs = FUEL_LOGS }) {
  const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];

  const { monthlyData, curStats, prevStats } = useMemo(() => {
    const byMonth = {};
    logs.forEach(l => {
      const d = new Date(l.date + 'T12:00:00');
      const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
      (byMonth[key] = byMonth[key] || []).push(l);
    });
    const now = new Date(TODAY);
    const keys = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
      return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    });
    const data = keys.map(key => {
      const ls = byMonth[key] || [];
      const total = ls.reduce((s, l) => s + l.total, 0);
      const liters = ls.reduce((s, l) => s + l.liters, 0);
      const withKmL = ls.filter(l => typeof l.kmL === 'number' && l.kmL > 0);
      const kmL = withKmL.length ? withKmL.reduce((s, l) => s + l.kmL, 0) / withKmL.length : 0;
      const [, m] = key.split('-');
      return { m: MONTHS_SHORT[parseInt(m, 10) - 1], total, liters, kmL };
    });
    return { monthlyData: data, curStats: data[data.length - 1], prevStats: data[data.length - 2] };
  }, [logs]);

  const monthSpend = curStats.total;
  const monthKmL = curStats.kmL;
  const prevKmL = prevStats.kmL;
  const monthLiters = curStats.liters;

  const now = new Date(TODAY);
  const curMonthLogs = logs.filter(l => {
    const d = new Date(l.date + 'T12:00:00');
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const fillCount = curMonthLogs.length;
  const avgLiters = fillCount > 0 ? monthLiters / fillCount : 0;
  const spendDelta = prevStats.total > 0
    ? Math.round(((monthSpend - prevStats.total) / prevStats.total) * 100)
    : 0;

  const status = (() => {
    if (monthKmL <= 0) return 'normal';
    if (prevKmL <= 0) return monthKmL >= (vehicle?.avgKmL || 12) ? 'hemat' : 'boros';
    if (monthKmL >= prevKmL * 1.05) return 'hemat';
    if (monthKmL <= prevKmL * 0.95) return 'boros';
    return 'irit';
  })();

  return (
    <div className="screen-fade" style={{ paddingBottom: 130 }}>
      <ScreenHeader
        sub="Halo, Andi"
        title="Dashboard"
        right={
          <div style={{ display: 'flex', gap: 8 }}>
            <CircleBtn><IconBell size={18} /></CircleBtn>
            <CircleBtn onClick={onSwitchVehicle}>
              <span style={{ fontSize: 11, fontWeight: 700 }} className="mono">{vehicle.id === 'civic' ? '01' : '02'}</span>
            </CircleBtn>
          </div>
        }
      />

      <StatusBanner status={status} value={monthKmL} prev={prevKmL} vehicle={vehicle} />

      {/* Vehicle selector strip */}
      <div style={{ padding: '0 16px 16px' }}>
        <div onClick={onSwitchVehicle} style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '10px 14px', borderRadius: 14,
          background: 'var(--surface)', border: '1px solid var(--stroke)',
          cursor: 'pointer',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: vehicle.photoTone,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff',
          }}>
            <IconCar size={20} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{vehicle.make} {vehicle.model} <span style={{ color: 'var(--ink-mute)', fontWeight: 500 }}>· {vehicle.year}</span></div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-mute)', marginTop: 2 }}>{vehicle.plate} · {vehicle.odometer.toLocaleString('id-ID')} km</div>
          </div>
          <IconChevD size={18} />
        </div>
      </div>

      {/* Spending card */}
      <div style={{ padding: '0 16px' }}>
        <Card style={{ padding: 20, marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
            <div style={{ fontSize: 12, color: 'var(--ink-mute)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Pengeluaran {curStats.m}
            </div>
            {prevStats.total > 0 && (
              <div style={{ fontSize: 11, color: spendDelta <= 0 ? 'var(--good)' : 'var(--warn)', fontWeight: 700 }}>
                {spendDelta > 0 ? '+' : ''}{spendDelta}% vs {prevStats.m}
              </div>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 16 }}>
            <span className="mono" style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.02em' }}>
              {monthSpend > 0 ? fmtIDRfull(monthSpend) : <span style={{ color: 'var(--ink-mute)', fontSize: 22 }}>Belum ada data</span>}
            </span>
          </div>
          <MonthlyChart data={monthlyData} />
        </Card>

        {/* Two-up stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
          <Card style={{ padding: 16 }}>
            <div style={{ fontSize: 11, color: 'var(--ink-mute)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>Efisiensi</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span className="mono" style={{ fontSize: 28, fontWeight: 700 }}>
                {monthKmL > 0 ? monthKmL.toFixed(1) : '—'}
              </span>
              <span style={{ fontSize: 12, color: 'var(--ink-dim)', fontWeight: 600 }}>km/L</span>
            </div>
            <div style={{ marginTop: 8 }}>
              <SparkBars data={monthlyData.map(m => (m.kmL * 10) || 1)} highlight={monthlyData.length - 1} />
            </div>
          </Card>
          <Card style={{ padding: 16 }}>
            <div style={{ fontSize: 11, color: 'var(--ink-mute)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>Total liter</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span className="mono" style={{ fontSize: 28, fontWeight: 700 }}>{monthLiters.toFixed(1)}</span>
              <span style={{ fontSize: 12, color: 'var(--ink-dim)', fontWeight: 600 }}>L</span>
            </div>
            <div style={{ marginTop: 8, fontSize: 11, color: 'var(--ink-dim)', lineHeight: 1.4 }}>
              {fillCount > 0
                ? <><span className="mono">{fillCount} kali isi</span> · rata-rata <span className="mono">{avgLiters.toFixed(1)}L</span></>
                : <span style={{ color: 'var(--ink-mute)' }}>Belum ada catatan</span>
              }
            </div>
          </Card>
        </div>

        {/* Maintenance reminder */}
        <Card style={{ padding: 16, marginBottom: 14, background: 'var(--ink)', color: 'var(--surface)' }} dark onClick={() => onNavigate('maintenance')}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--accent)', color: 'var(--accent-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconWrench size={16} />
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Servis mendatang</span>
            </div>
            <IconChevR size={16} />
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{UPCOMING_SERVICE.category}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginBottom: 10 }} className="mono">{UPCOMING_SERVICE.due} · {UPCOMING_SERVICE.dueDate}</div>
          <div style={{ height: 6, background: 'rgba(255,255,255,0.12)', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ width: `${UPCOMING_SERVICE.progress * 100}%`, height: '100%', background: 'var(--accent)' }} />
          </div>
        </Card>

        {/* Recent fills */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, padding: '8px 4px 6px' }}>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>Isi terakhir</h3>
          <button onClick={() => onNavigate('history')} style={{ fontSize: 13, color: 'var(--ink-dim)', fontWeight: 600 }}>
            Lihat semua
          </button>
        </div>
        <Card style={{ padding: '4px 16px 6px' }}>
          {logs.slice(0, 3).map(log => <FuelLogRow key={log.id} log={log} />)}
        </Card>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// HISTORY
// ─────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────
// HISTORY
// ─────────────────────────────────────────────────────────────
// Mock "today" — PRD data lives around 2026-05; align to user's locale
const TODAY = new Date('2026-05-16T12:00:00');
const MONTH_LABELS_ID = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];

function getRangeStart(period) {
  const t = new Date(TODAY);
  t.setHours(0, 0, 0, 0);
  switch (period) {
    case 'hari':   return t;
    case 'minggu': t.setDate(t.getDate() - 6); return t;
    case 'bulan':  t.setDate(1); return t;
    case 'tahun':  t.setMonth(0, 1); return t;
    case 'semua':
    default:       return new Date(0);
  }
}
const periodLabel = {
  hari:   'hari ini',
  minggu: '7 hari terakhir',
  bulan:  'bulan ini',
  tahun:  'tahun ini',
  semua:  'semua waktu',
};
const periodEmpty = {
  hari:   'Belum ada catatan hari ini',
  minggu: 'Tidak ada catatan minggu ini',
  bulan:  'Belum ada catatan bulan ini',
  tahun:  'Belum ada catatan tahun ini',
  semua:  'Belum ada catatan apapun',
};

function HistoryScreen({ logs = FUEL_LOGS, onLogMenu }) {
  const [period, setPeriod] = useState('bulan');

  const { filtered, total, liters, avgKmL, grouped, groupedKeys } = useMemo(() => {
    const start = getRangeStart(period);
    const filt = logs.filter(l => new Date(l.date + 'T12:00:00') >= start);
    const total = filt.reduce((s, l) => s + l.total, 0);
    const liters = filt.reduce((s, l) => s + l.liters, 0);
    const withKmL = filt.filter(l => typeof l.kmL === 'number' && l.kmL > 0);
    const kmL = withKmL.length ? (withKmL.reduce((s, l) => s + l.kmL, 0) / withKmL.length) : 0;

    const g = {};
    filt.forEach(l => {
      const d = new Date(l.date + 'T12:00:00');
      const key = (period === 'hari' || period === 'minggu')
        ? l.date
        : `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      (g[key] = g[key] || []).push(l);
    });
    return {
      filtered: filt, total, liters, avgKmL: kmL,
      grouped: g,
      groupedKeys: Object.keys(g).sort((a, b) => b.localeCompare(a)),
    };
  }, [period, logs]);

  const formatGroupTitle = (key) => {
    if (period === 'hari' || period === 'minggu') {
      const d = new Date(key + 'T12:00:00');
      const today = new Date(TODAY); today.setHours(0,0,0,0);
      const days = Math.round((today - d) / 86400000);
      if (days === 0) return 'Hari ini';
      if (days === 1) return 'Kemarin';
      return `${d.getDate()} ${MONTH_LABELS_ID[d.getMonth()].slice(0,3)}`;
    }
    const [y, m] = key.split('-');
    return `${MONTH_LABELS_ID[parseInt(m, 10) - 1]} ${y}`;
  };

  const subText = filtered.length
    ? `${liters.toFixed(1)} L · ${filtered.length} isi ${periodLabel[period]}`
    : `Tidak ada data · ${periodLabel[period]}`;

  return (
    <div className="screen-fade" style={{ paddingBottom: 130 }}>
      <ScreenHeader
        title="Riwayat"
        sub={subText}
        right={<CircleBtn><IconFilter size={18}/></CircleBtn>}
      />

      <div style={{ display: 'flex', gap: 8, padding: '0 22px 18px', overflowX: 'auto' }} className="hide-scroll">
        {[['hari','Hari'],['minggu','Minggu'],['bulan','Bulan'],['tahun','Tahun'],['semua','Semua']].map(([id, label]) => (
          <Pill key={id} active={period === id} onClick={() => setPeriod(id)}>{label}</Pill>
        ))}
      </div>

      {/* Aggregate summary */}
      <div style={{ padding: '0 16px 16px' }}>
        <Card style={{ padding: 18, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          <div>
            <div style={{ fontSize: 10, color: 'var(--ink-mute)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Total</div>
            <div className="mono" style={{ fontSize: 20, fontWeight: 700, marginTop: 4 }}>
              {total >= 1_000_000
                ? <>{(total/1_000_000).toFixed(2)}<span style={{ fontSize: 12 }}>jt</span></>
                : total >= 1000
                  ? <>{(total/1000).toFixed(0)}<span style={{ fontSize: 12 }}>rb</span></>
                  : <>{total}</>
              }
            </div>
          </div>
          <div style={{ borderLeft: '1px solid var(--stroke)', paddingLeft: 12 }}>
            <div style={{ fontSize: 10, color: 'var(--ink-mute)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Liter</div>
            <div className="mono" style={{ fontSize: 20, fontWeight: 700, marginTop: 4 }}>
              {liters.toFixed(1)}<span style={{ fontSize: 12 }}>L</span>
            </div>
          </div>
          <div style={{ borderLeft: '1px solid var(--stroke)', paddingLeft: 12 }}>
            <div style={{ fontSize: 10, color: 'var(--ink-mute)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Avg</div>
            <div className="mono" style={{ fontSize: 20, fontWeight: 700, marginTop: 4 }}>
              {avgKmL.toFixed(1)}<span style={{ fontSize: 11 }}>km/L</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Groups or empty state */}
      <div style={{ padding: '0 16px' }}>
        {groupedKeys.length === 0 ? (
          <Card style={{ padding: 36, textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: 18, background: 'rgba(23,22,20,0.05)', margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-mute)' }}>
              <IconDrop size={26} />
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{periodEmpty[period]}</div>
            <div style={{ fontSize: 13, color: 'var(--ink-dim)', lineHeight: 1.4 }}>Coba pilih periode lain atau catat isi bensin baru.</div>
          </Card>
        ) : groupedKeys.map(key => {
          const logs = grouped[key];
          const gTotal = logs.reduce((s, l) => s + l.total, 0);
          const gLiters = logs.reduce((s, l) => s + l.liters, 0);
          return (
            <div key={key} style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '4px 4px 8px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.04em' }}>{formatGroupTitle(key)}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-mute)' }} className="mono">{gLiters.toFixed(1)}L · {fmtIDR(gTotal)}</div>
              </div>
              <Card style={{ padding: '4px 16px 6px' }}>
                {logs.map(log => <FuelLogRow key={log.id} log={log} onMenu={onLogMenu} />)}
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// GARAGE
// ─────────────────────────────────────────────────────────────
function VehicleCard({ vehicle, active, onClick, onMenu, onDelete, fillCount = 0 }) {
  return (
    <div onClick={onClick} style={{
      borderRadius: 22, overflow: 'hidden',
      background: vehicle.photoTone, color: '#fff',
      padding: 0, position: 'relative',
      border: active ? '2px solid var(--accent)' : '2px solid transparent',
      cursor: 'pointer',
      boxShadow: '0 14px 30px rgba(0,0,0,0.18)',
    }}>
      {/* car silhouette */}
      <div style={{ position: 'relative', height: 130, padding: '14px 18px' }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.16, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle at 80% 30%, rgba(255,255,255,0.4) 0%, transparent 50%)',
        }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 2, gap: 8 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', opacity: 0.7 }}>KENDARAAN</div>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', marginTop: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{vehicle.make} {vehicle.model}</div>
            <div style={{ fontSize: 12, opacity: 0.7, marginTop: 2, whiteSpace: 'nowrap' }} className="mono">{vehicle.year} · TANGKI {vehicle.tank}L</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
            {active && (
              <div style={{
                padding: '4px 10px', borderRadius: 9999,
                background: 'var(--accent)', color: 'var(--accent-ink)',
                fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
              }}>AKTIF</div>
            )}
            <div style={{ display: 'flex', gap: 6 }}>
              <button
                onClick={e => { e.stopPropagation(); onMenu?.(vehicle); }}
                style={{
                  width: 32, height: 32, borderRadius: 9999,
                  background: 'rgba(255,255,255,0.14)', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backdropFilter: 'blur(6px)',
                }}
                aria-label="Aksi kendaraan"
              >
                <IconDots size={18} />
              </button>
              <button
                onClick={e => { e.stopPropagation(); onDelete?.(vehicle); }}
                style={{
                  width: 32, height: 32, borderRadius: 9999,
                  background: 'rgba(232,146,75,0.85)', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backdropFilter: 'blur(6px)',
                }}
                aria-label="Hapus kendaraan"
              >
                <IconTrash size={16} />
              </button>
            </div>
          </div>
        </div>
        {/* Big car icon */}
        <div style={{ position: 'absolute', right: -16, bottom: -12, opacity: 0.14, zIndex: 0, pointerEvents: 'none' }}>
          <IconCar size={120} />
        </div>
      </div>

      {/* Stats footer */}
      <div style={{
        background: 'rgba(0,0,0,0.32)', backdropFilter: 'blur(6px)',
        padding: '12px 18px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10,
      }}>
        <div>
          <div style={{ fontSize: 10, opacity: 0.65, letterSpacing: '0.08em', fontWeight: 600 }}>ODO</div>
          <div className="mono" style={{ fontSize: 14, fontWeight: 700, marginTop: 2 }}>{(vehicle.odometer/1000).toFixed(1)}k</div>
        </div>
        <div>
          <div style={{ fontSize: 10, opacity: 0.65, letterSpacing: '0.08em', fontWeight: 600 }}>AVG km/L</div>
          <div className="mono" style={{ fontSize: 14, fontWeight: 700, marginTop: 2 }}>{vehicle.avgKmL > 0 ? vehicle.avgKmL : '—'}</div>
        </div>
        <div>
          <div style={{ fontSize: 10, opacity: 0.65, letterSpacing: '0.08em', fontWeight: 600 }}>ISI</div>
          <div className="mono" style={{ fontSize: 14, fontWeight: 700, marginTop: 2 }}>{fillCount}x</div>
        </div>
        <div>
          <div style={{ fontSize: 10, opacity: 0.65, letterSpacing: '0.08em', fontWeight: 600 }}>PLAT</div>
          <div className="mono" style={{ fontSize: 12, fontWeight: 700, marginTop: 4 }}>{vehicle.plate}</div>
        </div>
      </div>
    </div>
  );
}

function GarageScreen({ activeVehicleId, onSelect, vehicles = VEHICLES, allLogs = [], onAdd, onMenu, onDelete }) {
  // Compute per-vehicle avgKmL from actual logs
  const vehicleStats = useMemo(() => {
    const stats = {};
    vehicles.forEach(v => {
      const vLogs = allLogs.filter(l => (l.vehicleId || 'civic') === v.id && typeof l.kmL === 'number' && l.kmL > 0);
      stats[v.id] = {
        avgKmL: vLogs.length ? parseFloat((vLogs.reduce((s, l) => s + l.kmL, 0) / vLogs.length).toFixed(1)) : v.avgKmL,
        fillCount: allLogs.filter(l => (l.vehicleId || 'civic') === v.id).length,
      };
    });
    return stats;
  }, [vehicles, allLogs]);

  // Insight: compare vehicles if 2+ have logs
  const insight = useMemo(() => {
    if (vehicles.length < 2) return null;
    const ranked = vehicles
      .map(v => ({ v, avg: vehicleStats[v.id]?.avgKmL || 0 }))
      .filter(x => x.avg > 0)
      .sort((a, b) => b.avg - a.avg);
    if (ranked.length < 2) return null;
    const [best, worst] = ranked;
    const diff = Math.round(((best.avg - worst.avg) / worst.avg) * 100);
    return `${best.v.make} ${best.v.model} ${diff}% lebih efisien dari ${worst.v.make} ${worst.v.model} berdasarkan riwayat. Pilih untuk perjalanan jauh.`;
  }, [vehicles, vehicleStats]);

  return (
    <div className="screen-fade" style={{ paddingBottom: 130 }}>
      <ScreenHeader
        title="Garasi"
        sub={`${vehicles.length} kendaraan`}
        right={<CircleBtn onClick={onAdd}><IconPlus size={20}/></CircleBtn>}
      />

      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {vehicles.map(v => (
          <VehicleCard
            key={v.id}
            vehicle={{ ...v, avgKmL: vehicleStats[v.id]?.avgKmL ?? v.avgKmL }}
            active={v.id === activeVehicleId}
            fillCount={vehicleStats[v.id]?.fillCount ?? 0}
            onClick={() => onSelect(v.id)}
            onMenu={onMenu}
            onDelete={onDelete}
          />
        ))}
        <button onClick={onAdd} style={{
          height: 76, borderRadius: 22, border: '2px dashed var(--stroke-strong)',
          color: 'var(--ink-dim)', fontSize: 15, fontWeight: 600,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          background: 'transparent',
        }}>
          <IconPlus size={20} /> Tambah kendaraan
        </button>
      </div>

      {insight && (
        <>
          <h3 style={{ padding: '24px 22px 10px', margin: 0, fontSize: 17, fontWeight: 700 }}>Insight kendaraan</h3>
          <div style={{ padding: '0 16px' }}>
            <Card style={{ padding: 16 }}>
              <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--ink-dim)' }}>{insight}</div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAINTENANCE
// ─────────────────────────────────────────────────────────────
function MaintenanceScreen({ logs = MAINTENANCE, onAdd, vehicle }) {
  const total = logs.reduce((s, m) => s + m.cost, 0);
  const last = logs[0];
  const lastDays = last ? Math.max(0, Math.round((TODAY - new Date(last.date + 'T12:00:00')) / 86400000)) : null;
  const vehicleLabel = vehicle ? `${vehicle.make} ${vehicle.model} ${vehicle.year}` : 'Honda Civic 2020';
  return (
    <div className="screen-fade" style={{ paddingBottom: 130 }}>
      <ScreenHeader title="Servis" sub={vehicleLabel} right={<CircleBtn onClick={onAdd}><IconPlus size={20}/></CircleBtn>} />

      {/* Upcoming */}
      <div style={{ padding: '0 16px 16px' }}>
        <Card dark style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: 'var(--accent)', color: 'var(--accent-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconWrench size={18}/>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', opacity: 0.7 }}>MENDATANG</div>
              <div style={{ fontSize: 16, fontWeight: 600, marginTop: 2 }}>{UPCOMING_SERVICE.category}</div>
            </div>
          </div>
          <div style={{ marginBottom: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12, opacity: 0.7 }} className="mono">
              <span>67,420 km</span>
              <span>70,000 km</span>
            </div>
            <div style={{ height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ width: `${UPCOMING_SERVICE.progress * 100}%`, height: '100%', background: 'var(--accent)' }}/>
            </div>
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 10 }}>
            {UPCOMING_SERVICE.due} · {UPCOMING_SERVICE.dueDate}
          </div>
        </Card>
      </div>

      {/* Summary */}
      <div style={{ padding: '0 16px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <Card style={{ padding: 16 }}>
          <div style={{ fontSize: 10, color: 'var(--ink-mute)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Total 12 bln</div>
          <div className="mono" style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>{fmtIDR(total)}</div>
        </Card>
        <Card style={{ padding: 16 }}>
          <div style={{ fontSize: 10, color: 'var(--ink-mute)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Servis terakhir</div>
          <div className="mono" style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>{last ? fmtDateShort(last.date) : '—'}</div>
          <div style={{ fontSize: 11, color: 'var(--ink-mute)', marginTop: 2 }}>{last ? `${lastDays} hari lalu` : 'belum ada catatan'}</div>
        </Card>
      </div>

      {/* History */}
      <div style={{ padding: '0 22px 10px', display: 'flex', justifyContent: 'space-between' }}>
        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>Riwayat servis</h3>
        <div style={{ fontSize: 13, color: 'var(--ink-mute)' }}>{logs.length} catatan</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {logs.length === 0 ? (
          <Card style={{ padding: 36, textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: 18, background: 'rgba(23,22,20,0.05)', margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-mute)' }}>
              <IconWrench size={26}/>
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Belum ada catatan servis</div>
            <div style={{ fontSize: 13, color: 'var(--ink-dim)', lineHeight: 1.4, marginBottom: 14 }}>Catat ganti oli, ban, atau servis berkala untuk lihat riwayatnya di sini.</div>
            <button onClick={onAdd} style={{
              padding: '10px 18px', borderRadius: 12,
              background: 'var(--ink)', color: 'var(--surface)',
              fontSize: 13, fontWeight: 700,
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}><IconPlus size={14}/> Catat servis pertama</button>
          </Card>
        ) : (
        <Card style={{ padding: '4px 16px 6px' }}>
          {logs.map((m, i) => (
            <div key={m.id} style={{
              display: 'flex', gap: 14, padding: '14px 0',
              borderTop: i === 0 ? 'none' : '1px solid var(--stroke)',
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: 'rgba(23,22,20,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <IconWrench size={20} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{m.category}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-dim)', marginTop: 2, lineHeight: 1.35 }}>{m.desc}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-mute)', marginTop: 4 }} className="mono">
                  {fmtDate(m.date)}{m.odo ? ` · ${m.odo.toLocaleString('id-ID')} km` : ''}{m.station ? ` · ${m.station}` : ''}
                </div>
              </div>
              <div className="mono" style={{ fontSize: 14, fontWeight: 700, alignSelf: 'flex-start' }}>{fmtIDR(m.cost)}</div>
            </div>
          ))}
        </Card>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ADD-FUEL FLOW (sheet)
// ─────────────────────────────────────────────────────────────
function ChoiceSheet({ onScan, onManual, onClose }) {
  return (
    <div style={{ padding: '8px 22px 28px' }}>
      <div style={{ width: 40, height: 4, borderRadius: 2, background: 'var(--ink-faint)', margin: '0 auto 18px' }} />
      <h2 style={{ margin: '0 0 6px', fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Catat isi bensin</h2>
      <p style={{ margin: '0 0 22px', color: 'var(--ink-dim)', fontSize: 14 }}>Pilih cara cepat untuk masuk data hari ini.</p>

      <button onClick={onScan} style={{
        width: '100%', padding: '20px', borderRadius: 20,
        background: 'var(--accent)', color: 'var(--accent-ink)',
        display: 'flex', alignItems: 'center', gap: 16, textAlign: 'left',
        marginBottom: 12, boxShadow: '0 8px 18px rgba(143,170,31,0.28)',
      }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--accent-ink)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconCamera size={24} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 17, fontWeight: 700 }}>Scan struk</div>
          <div style={{ fontSize: 12, fontWeight: 500, opacity: 0.7, marginTop: 2 }}>~15 detik · isi otomatis dengan OCR</div>
        </div>
        <IconChevR size={20} />
      </button>

      <button onClick={onManual} style={{
        width: '100%', padding: '20px', borderRadius: 20,
        background: 'var(--surface)', border: '1px solid var(--stroke)',
        display: 'flex', alignItems: 'center', gap: 16, textAlign: 'left',
        marginBottom: 10,
      }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(23,22,20,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconReceipt size={24} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 17, fontWeight: 700 }}>Input manual</div>
          <div style={{ fontSize: 12, color: 'var(--ink-dim)', marginTop: 2 }}>Ketik liter, harga & odometer sendiri</div>
        </div>
        <IconChevR size={20} />
      </button>

      <button onClick={onClose} style={{
        width: '100%', padding: '14px', marginTop: 10,
        fontSize: 14, color: 'var(--ink-dim)', fontWeight: 600,
      }}>Batal</button>
    </div>
  );
}

function ScanSheet({ onResult, onClose }) {
  const [stage, setStage] = useState('camera'); // camera → processing → done
  useEffect(() => {
    if (stage === 'camera') {
      const t = setTimeout(() => setStage('processing'), 1600);
      return () => clearTimeout(t);
    }
    if (stage === 'processing') {
      const t = setTimeout(() => onResult(), 2200);
      return () => clearTimeout(t);
    }
  }, [stage, onResult]);

  return (
    <div style={{ background: '#0A0A08', color: '#fff', minHeight: 540, position: 'relative', overflow: 'hidden', borderRadius: '24px 24px 0 0' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 18px 12px', position: 'relative', zIndex: 5 }}>
        <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: 9999, background: 'rgba(255,255,255,0.1)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconClose size={18} />
        </button>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.06em' }}>SCAN STRUK</div>
        <button style={{ width: 36, height: 36, borderRadius: 9999, background: 'rgba(255,255,255,0.1)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconFlash size={16} />
        </button>
      </div>

      {/* Viewfinder */}
      <div style={{ padding: '0 28px 28px', position: 'relative' }}>
        <div style={{
          aspectRatio: '3 / 4', borderRadius: 18, position: 'relative', overflow: 'hidden',
          background: '#1c1d18',
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
        }}>
          {/* fake receipt */}
          <div style={{
            position: 'absolute', inset: '8% 14%',
            background: '#F4EFE3', color: '#1a1a18',
            borderRadius: 6, padding: '14px 12px',
            transform: 'rotate(-1.5deg)',
            boxShadow: '0 10px 22px rgba(0,0,0,0.4)',
            fontFamily: 'JetBrains Mono, monospace', fontSize: 9, lineHeight: 1.5,
          }}>
            <div style={{ textAlign: 'center', fontWeight: 700, marginBottom: 8 }}>* * * SPBU 31.116.02 * * *</div>
            <div style={{ textAlign: 'center', marginBottom: 8 }}>JL. JEND. SUDIRMAN<br/>JAKARTA</div>
            <div style={{ borderTop: '1px dashed #888', margin: '6px 0' }} />
            <div>14/05/2026 16:42</div>
            <div>NO. POMPA &nbsp; : 04</div>
            <div>PRODUK &nbsp;&nbsp;&nbsp; : PERTAMAX</div>
            <div>HARGA/L &nbsp;&nbsp; : 13.000</div>
            <div>LITER &nbsp;&nbsp;&nbsp;&nbsp; : 38.20</div>
            <div style={{ borderTop: '1px dashed #888', margin: '6px 0' }} />
            <div style={{ fontWeight: 700 }}>TOTAL &nbsp;&nbsp;&nbsp; : Rp 496.600</div>
            <div style={{ textAlign: 'center', marginTop: 8, fontSize: 8 }}>TERIMA KASIH</div>
          </div>

          {/* Reticle */}
          <div style={{
            position: 'absolute', inset: '4%',
            borderRadius: 14, pointerEvents: 'none',
          }}>
            {[[0,0,1,1],[0,'auto','auto',1],[1,0,'auto','auto'],['auto',0,1,'auto']].map((p, i) => {
              const map = ['top','right','bottom','left'];
              const style = {};
              p.forEach((v, j) => { if (v !== 'auto') style[map[j]] = v === 1 ? 0 : 'auto'; });
              return (
                <div key={i} style={{
                  position: 'absolute', ...style, width: 28, height: 28,
                  borderTop: i < 2 ? '3px solid var(--accent)' : 'none',
                  borderBottom: i >= 2 ? '3px solid var(--accent)' : 'none',
                  borderLeft: (i === 0 || i === 3) ? '3px solid var(--accent)' : 'none',
                  borderRight: (i === 1 || i === 2) ? '3px solid var(--accent)' : 'none',
                  borderRadius: 8,
                }}/>
              );
            })}
            {stage === 'camera' && (
              <div style={{
                position: 'absolute', left: 0, right: 0, top: 0, height: 3,
                background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
                animation: 'scan 1.6s ease-in-out infinite',
                boxShadow: '0 0 14px var(--accent)',
              }}/>
            )}
          </div>

          {stage === 'processing' && (
            <div style={{
              position: 'absolute', inset: 0, background: 'rgba(10,10,8,0.7)',
              backdropFilter: 'blur(2px)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 9999,
                border: '3px solid rgba(255,255,255,0.15)',
                borderTopColor: 'var(--accent)',
                animation: 'spin 0.9s linear infinite',
              }} />
              <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.04em' }}>Membaca struk…</div>
              <div className="mono" style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>OCR Cloud Vision · 96% confidence</div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.4, padding: '0 20px' }}>
          {stage === 'camera' ? 'Posisikan struk di dalam frame. Pastikan teks terbaca jelas.' : 'Menganalisis tanggal, liter, total & merek…'}
        </div>
      </div>

      {/* Bottom controls */}
      {stage === 'camera' && (
        <div style={{ padding: '0 28px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
          <button style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>Galeri</button>
          <div style={{
            width: 76, height: 76, borderRadius: 9999, background: 'rgba(255,255,255,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: 62, height: 62, borderRadius: 9999, background: '#fff', animation: 'pulse 1.5s infinite' }}/>
          </div>
          <button style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>Manual</button>
        </div>
      )}
    </div>
  );
}

function FuelLogSheet({ mode = 'manual', existing, onSave, onClose, vehicle, lastOdo, ocrConfidence = 96 }) {
  // Mode 'scan' prefills with OCR-extracted values; 'manual' starts blank;
  // 'edit' prefills from `existing` log for in-place editing.
  const isScan = mode === 'scan';
  const isEdit = mode === 'edit' && existing;
  const todayIsoDate = (() => {
    const t = new Date(TODAY);
    return `${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,'0')}-${String(t.getDate()).padStart(2,'0')}`;
  })();

  const [form, setForm] = useState(() => {
    if (isEdit) return {
      date: existing.date,
      liters: String(existing.liters),
      total: String(existing.total),
      brand: existing.brand,
      station: existing.station === 'Tidak dicatat' ? '' : (existing.station || ''),
      odometer: String(existing.odo || ''),
    };
    return {
      date: todayIsoDate,
      liters: isScan ? '38.20' : '',
      total:  isScan ? '496600' : '',
      brand:  'Pertamax',
      station: isScan ? 'SPBU Sudirman' : '',
      odometer: isScan ? '68820' : String(lastOdo || vehicle?.odometer || ''),
    };
  });
  const [touched, setTouched] = useState(false);
  const [shake, setShake] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const litersNum = Number(form.liters) || 0;
  const totalNum  = Number(form.total)  || 0;
  const ppl = litersNum > 0 ? Math.round(totalNum / litersNum) : 0;

  const errors = {
    liters: touched && litersNum <= 0,
    total:  touched && totalNum <= 0,
    odo:    touched && (!form.odometer || (lastOdo && !isEdit && Number(form.odometer) < lastOdo)),
  };
  const hasError = errors.liters || errors.total || errors.odo;

  const BRANDS = ['Pertalite', 'Pertamax', 'Pertamax Turbo', 'Dex', 'Shell Super', 'Shell V-Power', 'Lainnya'];

  const handleSave = () => {
    setTouched(true);
    if (litersNum <= 0 || totalNum <= 0 || !form.odometer) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    if (lastOdo && !isEdit && Number(form.odometer) < lastOdo) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    const odo = Number(form.odometer);
    const kmSince = lastOdo && !isEdit ? odo - lastOdo : (existing?.kmSince ?? null);
    const kmL = kmSince && litersNum > 0 ? kmSince / litersNum : null;
    const avg = vehicle?.avgKmL || 12;
    const status = !kmL ? 'normal' : kmL >= avg * 1.05 ? 'hemat' : kmL <= avg * 0.95 ? 'boros' : 'normal';
    const d = new Date(form.date + 'T12:00:00');
    const dayNames = ['Min','Sen','Sel','Rab','Kam','Jum','Sab'];

    onSave({
      id: isEdit ? existing.id : ('f' + Date.now()),
      date: form.date,
      day: dayNames[d.getDay()],
      liters: litersNum,
      total: totalNum,
      ppl,
      brand: form.brand,
      station: form.station.trim() || 'Tidak dicatat',
      odo,
      kmSince,
      kmL,
      status,
      source: isEdit ? (existing.source || 'manual') : mode,
    });
  };

  return (
    <div style={{ padding: '8px 22px 24px', maxHeight: '88vh', overflowY: 'auto' }} className="hide-scroll">
      <div style={{ width: 40, height: 4, borderRadius: 2, background: 'var(--ink-faint)', margin: '0 auto 18px' }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            {isEdit ? 'Edit isi bensin' : isScan ? 'Verifikasi data' : 'Catat isi bensin'}
          </h2>
          <p style={{ margin: '4px 0 0', color: 'var(--ink-dim)', fontSize: 13 }}>
            {isEdit
              ? `Ubah catatan tanggal ${fmtDateShort(existing.date)}`
              : isScan
                ? 'Periksa hasil scan & sesuaikan jika perlu.'
                : (vehicle ? `${vehicle.make} ${vehicle.model} · ${vehicle.plate}` : 'Isi data secara manual')}
          </p>
        </div>
        {isScan ? (
          <div style={{
            padding: '6px 10px', borderRadius: 9999,
            background: 'var(--good-soft)', color: 'var(--good)',
            fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0,
          }}>
            <IconCheck size={12}/> OCR {ocrConfidence}%
          </div>
        ) : (
          <button onClick={onClose} style={{
            width: 36, height: 36, borderRadius: 9999,
            background: 'rgba(23,22,20,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <IconClose size={18}/>
          </button>
        )}
      </div>

      {/* Big pump-display editable card */}
      <div style={{
        background: '#0E0F0C', color: 'var(--accent)',
        borderRadius: 18, padding: '16px 18px', marginBottom: 12,
        border: '1px solid #2a2c24',
        boxShadow: hasError ? 'none' : '0 8px 18px rgba(0,0,0,0.12)',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {/* Liters */}
          <div>
            <div className="mono" style={{ fontSize: 10, color: errors.liters ? '#FF9E45' : '#888', letterSpacing: '0.12em', fontWeight: 600 }}>
              LITER
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                inputMode="decimal"
                value={form.liters}
                onChange={e => set('liters', e.target.value.replace(/[^0-9.]/g, ''))}
                placeholder="0.00"
                style={{
                  width: '100%', border: 'none', outline: 'none', background: 'transparent',
                  fontFamily: 'JetBrains Mono, ui-monospace, monospace',
                  fontSize: 30, fontWeight: 700, color: 'var(--accent)',
                  padding: '4px 0', letterSpacing: '-0.01em',
                  caretColor: 'var(--accent)',
                }}
              />
            </div>
          </div>
          {/* Total */}
          <div>
            <div className="mono" style={{ fontSize: 10, color: errors.total ? '#FF9E45' : '#888', letterSpacing: '0.12em', fontWeight: 600 }}>
              TOTAL · IDR
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <input
                type="text"
                inputMode="numeric"
                value={form.total ? Number(form.total).toLocaleString('id-ID') : ''}
                onChange={e => set('total', e.target.value.replace(/\D/g, ''))}
                placeholder="0"
                style={{
                  width: '100%', border: 'none', outline: 'none', background: 'transparent',
                  fontFamily: 'JetBrains Mono, ui-monospace, monospace',
                  fontSize: 30, fontWeight: 700, color: 'var(--accent)',
                  padding: '4px 0', letterSpacing: '-0.01em',
                  caretColor: 'var(--accent)',
                }}
              />
            </div>
          </div>
        </div>
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12 }}>
          <span style={{ color: '#888' }}>Harga/Liter</span>
          <span className="mono" style={{ color: '#fff', fontWeight: 600 }}>
            Rp {ppl ? ppl.toLocaleString('id-ID') : '—'}
          </span>
        </div>
      </div>

      {(errors.liters || errors.total) && (
        <div style={{ fontSize: 11.5, color: 'var(--warn)', fontWeight: 600, marginBottom: 10, paddingLeft: 6 }}>
          Liter dan total biaya wajib diisi
        </div>
      )}

      {/* Brand chips */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 10.5, color: 'var(--ink-mute)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8, paddingLeft: 4 }}>Merek BBM</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {BRANDS.map(b => (
            <button key={b} onClick={() => set('brand', b)} style={{
              padding: '7px 12px', borderRadius: 9999,
              background: form.brand === b ? 'var(--ink)' : 'var(--surface)',
              color: form.brand === b ? 'var(--accent)' : 'var(--ink)',
              border: form.brand === b ? '1px solid var(--ink)' : '1px solid var(--stroke-strong)',
              fontSize: 12.5, fontWeight: 600,
            }}>{b}</button>
          ))}
        </div>
      </div>

      {/* Date + Odometer */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
        <FieldShell label="Tanggal">
          <input
            type="date"
            value={form.date}
            onChange={e => set('date', e.target.value)}
            max={todayIsoDate}
            style={{
              width: '100%', border: 'none', outline: 'none', background: 'transparent',
              fontFamily: 'JetBrains Mono, ui-monospace, monospace',
              fontSize: 14, fontWeight: 600, color: 'var(--ink)', padding: '4px 0',
            }}
          />
        </FieldShell>
        <FieldShell label="Odometer" hint="km" error={errors.odo} errorMsg={lastOdo && Number(form.odometer) < lastOdo ? `Min. ${lastOdo.toLocaleString('id-ID')}` : 'Wajib diisi'}>
          <TextField value={form.odometer} onChange={v => set('odometer', v.replace(/\D/g, ''))} placeholder={String(lastOdo || 0)} mono suffix="km"/>
        </FieldShell>
      </div>

      {/* Station */}
      <FieldShell label="Lokasi pom bensin" hint="opsional">
        <TextField value={form.station} onChange={v => set('station', v)} placeholder="mis. SPBU Sudirman"/>
      </FieldShell>

      {/* Live summary */}
      {litersNum > 0 && totalNum > 0 && (
        <div style={{
          background: 'var(--accent)', color: 'var(--accent-ink)',
          borderRadius: 14, padding: '12px 14px', marginTop: 14, marginBottom: 4,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', opacity: 0.7 }}>RINGKASAN</div>
            <div className="mono" style={{ fontSize: 13, fontWeight: 600, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {litersNum.toFixed(2)}L · {form.brand}{form.station ? ` · ${form.station}` : ''}
            </div>
          </div>
          <div className="mono" style={{ fontSize: 18, fontWeight: 700, flexShrink: 0 }}>{fmtIDRfull(totalNum)}</div>
        </div>
      )}

      {/* Save */}
      <div style={{
        display: 'flex', gap: 10, marginTop: 18,
        animation: shake ? 'shake .42s cubic-bezier(.36,.07,.19,.97)' : 'none',
      }}>
        <button onClick={onClose} style={{
          flex: 1, height: 56, borderRadius: 16,
          background: 'transparent', border: '1px solid var(--stroke-strong)',
          fontSize: 15, fontWeight: 600,
        }}>Batal</button>
        <button onClick={handleSave} style={{
          flex: 2, height: 56, borderRadius: 16,
          background: hasError ? 'var(--warn)' : 'var(--accent)',
          color: hasError ? '#fff' : 'var(--accent-ink)',
          fontSize: 16, fontWeight: 700,
          boxShadow: hasError ? '0 8px 18px rgba(232,146,75,0.35)' : '0 8px 18px rgba(143,170,31,0.32)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          {hasError ? 'Lengkapi field di atas' : (<><IconCheck size={18} sw={2.4}/> {isEdit ? 'Simpan perubahan' : 'Simpan isi bensin'}</>)}
        </button>
      </div>
    </div>
  );
}

// Legacy wrapper — keep ReviewSheet name working for any old refs
function ReviewSheet(props) {
  return <FuelLogSheet mode="scan" {...props} />;
}

function SuccessToast({ onDone, title = 'Tersimpan! 38.2L · Rp 496.600', sub = 'Dashboard diperbarui' }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1800);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div style={{
      position: 'absolute', left: '50%', top: 90,
      transform: 'translateX(-50%)',
      background: 'var(--ink)', color: 'var(--accent)',
      padding: '14px 18px', borderRadius: 14,
      display: 'flex', alignItems: 'center', gap: 10,
      fontSize: 14, fontWeight: 600,
      boxShadow: '0 12px 28px rgba(0,0,0,0.18)',
      animation: 'fadeIn .25s ease-out',
      zIndex: 90,
      whiteSpace: 'nowrap',
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: 9999, background: 'var(--accent)', color: 'var(--accent-ink)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <IconCheck size={18}/>
      </div>
      <div>
        <div>{title}</div>
        <div style={{ fontSize: 11, opacity: 0.7, marginTop: 1 }}>{sub}</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ADD VEHICLE SHEET
// ─────────────────────────────────────────────────────────────
const VEHICLE_COLORS = [
  { name: 'Navy',     color: '#2D4A6B', tone: 'linear-gradient(135deg, #2D4A6B 0%, #1a2d42 100%)' },
  { name: 'Maroon',   color: '#7A2D2D', tone: 'linear-gradient(135deg, #7A2D2D 0%, #4a1818 100%)' },
  { name: 'Forest',   color: '#2D6B47', tone: 'linear-gradient(135deg, #2D6B47 0%, #1a4228 100%)' },
  { name: 'Charcoal', color: '#363636', tone: 'linear-gradient(135deg, #3a3a3a 0%, #1a1a1a 100%)' },
  { name: 'Ember',    color: '#B86A25', tone: 'linear-gradient(135deg, #b86a25 0%, #7c4115 100%)' },
  { name: 'Plum',     color: '#5B3A6B', tone: 'linear-gradient(135deg, #5b3a6b 0%, #3a2342 100%)' },
];
const BRAND_QUICK = ['Honda','Toyota','Suzuki','Daihatsu','Mitsubishi','Hyundai','Mazda','Nissan'];

function FieldShell({ label, hint, children, error, errorMsg }) {
  return (
    <div>
      <div style={{
        background: 'var(--surface)', border: `1px solid ${error ? 'var(--warn)' : 'var(--stroke)'}`,
        borderRadius: 14, padding: '10px 14px',
        boxShadow: error ? '0 0 0 3px rgba(232,146,75,0.18)' : 'none',
        transition: 'box-shadow .15s ease, border-color .15s ease',
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 10.5, color: error ? 'var(--warn)' : 'var(--ink-mute)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</div>
          {hint && <div style={{ fontSize: 10, color: 'var(--ink-mute)' }}>{hint}</div>}
        </div>
        {children}
      </div>
      {error && errorMsg && (
        <div style={{ fontSize: 11.5, color: 'var(--warn)', fontWeight: 600, padding: '4px 6px 0' }}>{errorMsg}</div>
      )}
    </div>
  );
}

function TextField({ value, onChange, placeholder, type = 'text', mono = false, suffix }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 2 }}>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent',
          fontFamily: mono ? 'JetBrains Mono, ui-monospace, monospace' : 'inherit',
          fontSize: 17, fontWeight: 600, color: 'var(--ink)',
          padding: '4px 0',
        }}
      />
      {suffix && <span className="mono" style={{ fontSize: 13, color: 'var(--ink-mute)', fontWeight: 600 }}>{suffix}</span>}
    </div>
  );
}

function AddVehicleSheet({ onSave, onClose, existing }) {
  const isEdit = !!existing;
  const findColorIdx = (toneOrColor) => {
    if (!toneOrColor) return 0;
    const idx = VEHICLE_COLORS.findIndex(c =>
      c.color === toneOrColor || c.tone === toneOrColor
    );
    return idx >= 0 ? idx : 0;
  };
  const [form, setForm] = useState(() => isEdit ? {
    make: existing.make || '',
    model: existing.model || '',
    year: String(existing.year || ''),
    tank: String(existing.tank || ''),
    plate: existing.plate === 'B 0000 XX' ? '' : (existing.plate || ''),
    colorIdx: findColorIdx(existing.photoTone || existing.color),
  } : {
    make: '', model: '', year: '2024', tank: '', plate: '', colorIdx: 0,
  });
  const [touched, setTouched] = useState(false);
  const [shake, setShake] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const errors = {
    make:  touched && !form.make.trim(),
    model: touched && !form.model.trim(),
    year:  touched && (!form.year || Number(form.year) < 1980 || Number(form.year) > 2030),
    tank:  touched && (!form.tank || Number(form.tank) <= 0),
  };
  const hasError = errors.make || errors.model || errors.year || errors.tank;

  const handleSave = () => {
    setTouched(true);
    const missing = !form.make.trim() || !form.model.trim() || !form.year || !form.tank || Number(form.tank) <= 0;
    if (missing) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    const c = VEHICLE_COLORS[form.colorIdx];
    onSave({
      id: isEdit ? existing.id : ('v' + Date.now()),
      make: form.make.trim(),
      model: form.model.trim(),
      year: parseInt(form.year, 10),
      tank: parseFloat(form.tank),
      plate: form.plate.trim() || 'B 0000 XX',
      color: c.color,
      photoTone: c.tone,
      odometer: isEdit ? existing.odometer : 0,
      avgKmL:   isEdit ? existing.avgKmL : 0,
    });
  };

  return (
    <div style={{ padding: '8px 22px 24px', maxHeight: '88vh', overflowY: 'auto' }} className="hide-scroll">
      <div style={{ width: 40, height: 4, borderRadius: 2, background: 'var(--ink-faint)', margin: '0 auto 18px' }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 4 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            {isEdit ? 'Edit kendaraan' : 'Tambah kendaraan'}
          </h2>
          <p style={{ margin: '4px 0 0', color: 'var(--ink-dim)', fontSize: 13 }}>
            {isEdit ? 'Ubah detail kendaraan ini.' : 'Isi detail mobilmu untuk mulai melacak.'}
          </p>
        </div>
        <button onClick={onClose} style={{
          width: 36, height: 36, borderRadius: 9999,
          background: 'rgba(23,22,20,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <IconClose size={18}/>
        </button>
      </div>

      {/* Live preview */}
      <div style={{ margin: '18px 0 18px' }}>
        <div style={{
          borderRadius: 18, overflow: 'hidden',
          background: VEHICLE_COLORS[form.colorIdx].tone, color: '#fff',
          padding: '14px 18px', position: 'relative',
          boxShadow: '0 14px 30px rgba(0,0,0,0.18)',
        }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.16, pointerEvents: 'none',
            backgroundImage: 'radial-gradient(circle at 80% 30%, rgba(255,255,255,0.4) 0%, transparent 50%)' }}/>
          <div style={{ position: 'relative', minHeight: 88 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', opacity: 0.7 }}>PREVIEW</div>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', marginTop: 4 }}>
              {form.make || 'Merek'} {form.model || 'Model'}
            </div>
            <div style={{ fontSize: 12, opacity: 0.7, marginTop: 2 }} className="mono">
              {form.year || '----'} · TANGKI {form.tank || '--'}L
            </div>
            <div style={{ position: 'absolute', right: -14, bottom: -16, opacity: 0.18 }}>
              <IconCar size={96} />
            </div>
          </div>
        </div>
      </div>

      {/* Brand quick-pick */}
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 10.5, color: 'var(--ink-mute)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8, paddingLeft: 4 }}>Merek populer</div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }} className="hide-scroll">
          {BRAND_QUICK.map(b => (
            <button key={b} onClick={() => set('make', b)} style={{
              padding: '8px 14px', borderRadius: 9999,
              background: form.make === b ? 'var(--ink)' : 'var(--surface)',
              color: form.make === b ? 'var(--surface)' : 'var(--ink)',
              border: form.make === b ? '1px solid var(--ink)' : '1px solid var(--stroke-strong)',
              fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0,
            }}>{b}</button>
          ))}
        </div>
      </div>

      {/* Form fields */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        <FieldShell label="Merek" error={errors.make} errorMsg="Pilih atau ketik merek">
          <TextField value={form.make} onChange={v => set('make', v)} placeholder="contoh: Honda" />
        </FieldShell>
        <FieldShell label="Model" error={errors.model} errorMsg="Model belum diisi">
          <TextField value={form.model} onChange={v => set('model', v)} placeholder="contoh: Civic" />
        </FieldShell>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <FieldShell label="Tahun" error={errors.year} errorMsg="1980 – 2030">
            <TextField value={form.year} onChange={v => set('year', v.replace(/\D/g, '').slice(0, 4))} placeholder="2024" mono />
          </FieldShell>
          <FieldShell label="Kap. tangki" hint="liter" error={errors.tank} errorMsg="Wajib diisi">
            <TextField value={form.tank} onChange={v => set('tank', v.replace(/[^0-9.]/g, ''))} placeholder="mis. 45" mono suffix="L" />
          </FieldShell>
        </div>
        <FieldShell label="Plat nomor" hint="opsional">
          <TextField value={form.plate} onChange={v => set('plate', v.toUpperCase().slice(0, 12))} placeholder="B 1234 GAS" mono />
        </FieldShell>
      </div>

      {/* Color picker */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 10.5, color: 'var(--ink-mute)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10, paddingLeft: 4 }}>Tema warna</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10 }}>
          {VEHICLE_COLORS.map((c, i) => (
            <button key={c.name} onClick={() => set('colorIdx', i)} style={{
              aspectRatio: '1', borderRadius: 14, background: c.tone,
              border: form.colorIdx === i ? '2.5px solid var(--ink)' : '2.5px solid transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 3px 10px rgba(0,0,0,0.15)',
            }}>
              {form.colorIdx === i && (
                <div style={{ width: 22, height: 22, borderRadius: 9999, background: '#fff', color: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconCheck size={14}/>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Save */}
      <div style={{
        display: 'flex', gap: 10,
        animation: shake ? 'shake .42s cubic-bezier(.36,.07,.19,.97)' : 'none',
      }}>
        <button onClick={onClose} style={{
          flex: 1, height: 56, borderRadius: 16,
          background: 'transparent', border: '1px solid var(--stroke-strong)',
          fontSize: 15, fontWeight: 600,
        }}>Batal</button>
        <button onClick={handleSave} style={{
          flex: 2, height: 56, borderRadius: 16,
          background: hasError ? 'var(--warn)' : 'var(--accent)',
          color: hasError ? '#fff' : 'var(--accent-ink)',
          fontSize: 16, fontWeight: 700,
          boxShadow: hasError
            ? '0 8px 18px rgba(232,146,75,0.35)'
            : '0 8px 18px rgba(143,170,31,0.32)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          {hasError ? 'Lengkapi field di atas' : (<><IconCheck size={18} sw={2.4}/> {isEdit ? 'Simpan perubahan' : 'Simpan kendaraan'}</>)}
        </button>
      </div>
    </div>
  );
}

export {
  ScreenHeader, CircleBtn, Pill, Card,
  LoginScreen, DashboardScreen, HistoryScreen, GarageScreen, MaintenanceScreen,
  ChoiceSheet, ScanSheet, ReviewSheet, FuelLogSheet, SuccessToast, AddVehicleSheet,
  VehicleActionsSheet, ConfirmSheet, AddMaintenanceSheet, FuelLogActionsSheet,
  FuelLogRow,
};

// ─────────────────────────────────────────────────────────────
// FUEL-LOG ACTIONS SHEET (edit / delete a single log)
// ─────────────────────────────────────────────────────────────
function FuelLogActionsSheet({ log, onEdit, onDelete, onClose }) {
  if (!log) return null;
  const isHemat = log.status === 'hemat';
  const isBoros = log.status === 'boros';
  return (
    <div style={{ padding: '8px 22px 26px' }}>
      <div style={{ width: 40, height: 4, borderRadius: 2, background: 'var(--ink-faint)', margin: '0 auto 18px' }} />

      {/* Log preview header */}
      <div style={{
        background: '#0E0F0C', color: 'var(--accent)',
        borderRadius: 18, padding: '14px 18px', marginBottom: 16,
        border: '1px solid #2a2c24',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
          <span className="mono" style={{ fontSize: 10, letterSpacing: '0.15em', color: '#888' }}>
            {log.brand.toUpperCase()}{log.source === 'manual' ? ' · MANUAL' : log.source === 'scan' ? ' · SCAN' : ''}
          </span>
          <span className="mono" style={{ fontSize: 10, color: '#888' }}>{fmtDateShort(log.date).toUpperCase()}</span>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <div className="mono" style={{ fontSize: 9, color: '#666', letterSpacing: '0.12em' }}>LITER</div>
            <div className="mono" style={{ fontSize: 22, color: 'var(--accent)', fontWeight: 600 }}>{log.liters.toFixed(2)}</div>
          </div>
          <div style={{ flex: 1 }}>
            <div className="mono" style={{ fontSize: 9, color: '#666', letterSpacing: '0.12em' }}>TOTAL · IDR</div>
            <div className="mono" style={{ fontSize: 22, color: 'var(--accent)', fontWeight: 600 }}>{log.total.toLocaleString('id-ID')}</div>
          </div>
        </div>
        <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#aaa' }}>
          <span>{log.station}</span>
          <span className="mono">
            {log.odo ? `${log.odo.toLocaleString('id-ID')} km` : '—'}
            {typeof log.kmL === 'number' && log.kmL > 0 && (
              <span style={{ marginLeft: 8, color: isHemat ? 'var(--accent)' : isBoros ? '#FF9E45' : '#aaa', fontWeight: 700 }}>
                {log.kmL.toFixed(1)} km/L
              </span>
            )}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button onClick={onEdit} style={{
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '14px 16px', borderRadius: 14, textAlign: 'left',
          background: 'var(--surface)', border: '1px solid var(--stroke)',
        }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--ink)', color: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconEdit size={18}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Edit catatan</div>
            <div style={{ fontSize: 12, color: 'var(--ink-dim)', marginTop: 2 }}>Ubah liter, biaya, odometer, dst.</div>
          </div>
          <IconChevR size={18}/>
        </button>

        <button onClick={onDelete} style={{
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '14px 16px', borderRadius: 14, textAlign: 'left',
          background: 'rgba(232,146,75,0.08)', border: '1px solid rgba(232,146,75,0.25)',
        }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--warn)', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconTrash size={18}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--warn)' }}>Hapus catatan</div>
            <div style={{ fontSize: 12, color: 'var(--ink-mute)', marginTop: 2 }}>Aksi ini tidak dapat dibatalkan</div>
          </div>
        </button>
      </div>

      <button onClick={onClose} style={{
        width: '100%', padding: '14px', marginTop: 14,
        fontSize: 14, color: 'var(--ink-dim)', fontWeight: 600,
      }}>Tutup</button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// VEHICLE ACTIONS SHEET (set active / delete)
// ─────────────────────────────────────────────────────────────
function VehicleActionsSheet({ vehicle, isActive, canDelete, onSetActive, onEdit, onDelete, onClose }) {
  if (!vehicle) return null;
  return (
    <div style={{ padding: '8px 22px 26px' }}>
      <div style={{ width: 40, height: 4, borderRadius: 2, background: 'var(--ink-faint)', margin: '0 auto 18px' }} />

      {/* Vehicle preview header */}
      <div style={{
        borderRadius: 18, overflow: 'hidden',
        background: vehicle.photoTone, color: '#fff',
        padding: '14px 18px', marginBottom: 16,
        position: 'relative',
        boxShadow: '0 10px 22px rgba(0,0,0,0.18)',
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.16,
          backgroundImage: 'radial-gradient(circle at 80% 30%, rgba(255,255,255,0.4) 0%, transparent 50%)' }}/>
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', opacity: 0.7 }}>KENDARAAN</div>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', marginTop: 2 }}>
            {vehicle.make} {vehicle.model}
          </div>
          <div className="mono" style={{ fontSize: 12, opacity: 0.7, marginTop: 2 }}>
            {vehicle.year} · {vehicle.plate} · TANGKI {vehicle.tank}L
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {!isActive && (
          <button onClick={onSetActive} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '14px 16px', borderRadius: 14, textAlign: 'left',
            background: 'var(--surface)', border: '1px solid var(--stroke)',
          }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--accent)', color: 'var(--accent-ink)',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconStar size={18}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>Jadikan kendaraan aktif</div>
              <div style={{ fontSize: 12, color: 'var(--ink-dim)', marginTop: 2 }}>Pakai untuk pencatatan & dashboard</div>
            </div>
            <IconChevR size={18}/>
          </button>
        )}

        <button onClick={() => onEdit?.(vehicle)} style={{
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '14px 16px', borderRadius: 14, textAlign: 'left',
          background: 'var(--surface)', border: '1px solid var(--stroke)',
        }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--ink)', color: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconEdit size={18}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Edit detail</div>
            <div style={{ fontSize: 12, color: 'var(--ink-dim)', marginTop: 2 }}>Ubah merek, tahun, tangki, plat & warna</div>
          </div>
          <IconChevR size={18}/>
        </button>

        <button
          onClick={canDelete ? onDelete : undefined}
          disabled={!canDelete}
          style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '14px 16px', borderRadius: 14, textAlign: 'left',
            background: canDelete ? 'rgba(232,146,75,0.08)' : 'var(--surface)',
            border: `1px solid ${canDelete ? 'rgba(232,146,75,0.25)' : 'var(--stroke)'}`,
            opacity: canDelete ? 1 : 0.6,
            cursor: canDelete ? 'pointer' : 'not-allowed',
          }}>
          <div style={{ width: 38, height: 38, borderRadius: 10,
            background: canDelete ? 'var(--warn)' : 'rgba(23,22,20,0.06)',
            color: canDelete ? '#fff' : 'var(--ink-mute)',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconTrash size={18}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: canDelete ? 'var(--warn)' : 'var(--ink-mute)' }}>
              Hapus kendaraan
            </div>
            <div style={{ fontSize: 12, color: 'var(--ink-mute)', marginTop: 2 }}>
              {canDelete ? 'Semua data terkait kendaraan akan hilang' : 'Minimal harus ada 1 kendaraan'}
            </div>
          </div>
        </button>
      </div>

      <button onClick={onClose} style={{
        width: '100%', padding: '14px', marginTop: 14,
        fontSize: 14, color: 'var(--ink-dim)', fontWeight: 600,
      }}>Tutup</button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CONFIRM SHEET (generic destructive confirmation)
// ─────────────────────────────────────────────────────────────
function ConfirmSheet({ title, body, confirmLabel = 'Hapus', cancelLabel = 'Batal', onConfirm, onClose }) {
  return (
    <div style={{ padding: '8px 22px 26px' }}>
      <div style={{ width: 40, height: 4, borderRadius: 2, background: 'var(--ink-faint)', margin: '0 auto 18px' }} />

      <div style={{
        width: 56, height: 56, borderRadius: 18, margin: '6px auto 14px',
        background: 'rgba(232,146,75,0.14)', color: 'var(--warn)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <IconAlert size={28}/>
      </div>

      <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, textAlign: 'center', letterSpacing: '-0.02em' }}>{title}</h2>
      <p style={{ margin: '8px 0 22px', textAlign: 'center', color: 'var(--ink-dim)', fontSize: 14, lineHeight: 1.5 }}>{body}</p>

      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={onClose} style={{
          flex: 1, height: 56, borderRadius: 16,
          background: 'transparent', border: '1px solid var(--stroke-strong)',
          fontSize: 15, fontWeight: 600,
        }}>{cancelLabel}</button>
        <button onClick={onConfirm} style={{
          flex: 1, height: 56, borderRadius: 16,
          background: 'var(--warn)', color: '#fff',
          fontSize: 15, fontWeight: 700,
          boxShadow: '0 8px 18px rgba(232,146,75,0.32)',
        }}>{confirmLabel}</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ADD MAINTENANCE SHEET
// ─────────────────────────────────────────────────────────────
const SERVICE_CATEGORIES = [
  { id: 'Servis Berkala', icon: IconWrench },
  { id: 'Ganti Oli',      icon: IconDrop },
  { id: 'Ban',            icon: IconCar },
  { id: 'Rem',            icon: IconAlert },
  { id: 'Aki & Listrik',  icon: IconBolt },
  { id: 'AC',             icon: IconSpark },
  { id: 'Body & Cat',     icon: IconStar },
  { id: 'Lainnya',        icon: IconSettings },
];

const SERVICE_ITEMS = {
  'Servis Berkala': ['Tune-up lengkap', 'Cek menyeluruh', 'Cek sistem rem', 'Cek suspensi', 'Cek kaki-kaki'],
  'Ganti Oli':      ['Oli mesin', 'Oli transmisi', 'Filter oli', 'Filter udara', 'Filter bensin', 'Filter kabin'],
  'Ban':            ['Rotasi ban', 'Balancing', 'Spooring', 'Ganti ban baru', 'Tambal ban', 'Cek tekanan'],
  'Rem':            ['Brake pad depan', 'Brake pad belakang', 'Cakram rem', 'Minyak rem', 'Servis kaliper'],
  'Aki & Listrik':  ['Ganti aki', 'Cek alternator', 'Ganti lampu', 'Kabel busi', 'Ganti busi'],
  'AC':             ['Servis AC', 'Ganti freon', 'Cuci kondensor', 'Ganti filter kabin', 'Cek kompresor'],
  'Body & Cat':     ['Poles body', 'Repaint panel', 'Repair penyok', 'Detailing', 'Coating'],
  'Lainnya':        [],
};

function AddMaintenanceSheet({ onSave, onClose, vehicle }) {
  const todayIso = (() => {
    const t = new Date(TODAY);
    return `${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,'0')}-${String(t.getDate()).padStart(2,'0')}`;
  })();
  const defaultOdo = vehicle?.odometer ? String(vehicle.odometer) : '';

  const [form, setForm] = useState({
    category: 'Servis Berkala',
    items: [],
    customItem: '',
    date: todayIso,
    cost: '',
    odo: defaultOdo,
    station: '',
  });
  const [touched, setTouched] = useState(false);
  const [shake, setShake] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const toggleItem = (item) => setForm(f => ({
    ...f,
    items: f.items.includes(item) ? f.items.filter(i => i !== item) : [...f.items, item],
  }));

  const addCustomItem = () => {
    const v = form.customItem.trim();
    if (!v) return;
    setForm(f => ({ ...f, customItem: '', items: f.items.includes(v) ? f.items : [...f.items, v] }));
  };

  const errors = {
    items: touched && form.items.length === 0,
    cost:  touched && (!form.cost || Number(form.cost) <= 0),
  };
  const hasError = errors.items || errors.cost;
  const totalCost = Number(form.cost) || 0;

  const handleSave = () => {
    setTouched(true);
    if (form.items.length === 0 || !form.cost || Number(form.cost) <= 0) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    onSave({
      id: 'm' + Date.now(),
      category: form.category,
      desc: form.items.join(', '),
      items: form.items,
      date: form.date,
      cost: Number(form.cost),
      odo: form.odo ? Number(form.odo) : null,
      station: form.station.trim() || null,
    });
  };

  const itemsForCategory = SERVICE_ITEMS[form.category] || [];

  return (
    <div style={{ padding: '8px 22px 24px', maxHeight: '88vh', overflowY: 'auto' }} className="hide-scroll">
      <div style={{ width: 40, height: 4, borderRadius: 2, background: 'var(--ink-faint)', margin: '0 auto 18px' }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 }}>Catat servis</h2>
          <p style={{ margin: '4px 0 0', color: 'var(--ink-dim)', fontSize: 13 }}>
            {vehicle ? `${vehicle.make} ${vehicle.model}` : 'Kendaraan aktif'}
          </p>
        </div>
        <button onClick={onClose} style={{
          width: 36, height: 36, borderRadius: 9999,
          background: 'rgba(23,22,20,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <IconClose size={18}/>
        </button>
      </div>

      {/* Category */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 10.5, color: 'var(--ink-mute)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8, paddingLeft: 4 }}>Kategori</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {SERVICE_CATEGORIES.map(cat => {
            const I = cat.icon;
            const active = form.category === cat.id;
            return (
              <button key={cat.id} onClick={() => { set('category', cat.id); set('items', []); }}
                style={{
                  padding: '10px 6px', borderRadius: 12,
                  background: active ? 'var(--ink)' : 'var(--surface)',
                  color: active ? 'var(--surface)' : 'var(--ink)',
                  border: active ? '1px solid var(--ink)' : '1px solid var(--stroke)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  fontSize: 10.5, fontWeight: 600, lineHeight: 1.2, textAlign: 'center',
                }}>
                <I size={18} sw={1.8}/>
                <span>{cat.id}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Items checklist */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8, paddingLeft: 4 }}>
          <div style={{ fontSize: 10.5, color: errors.items ? 'var(--warn)' : 'var(--ink-mute)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Item yang dilakukan</div>
          <div style={{ fontSize: 11, color: 'var(--ink-mute)' }}>{form.items.length} dipilih</div>
        </div>
        {itemsForCategory.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
            {itemsForCategory.map(item => {
              const active = form.items.includes(item);
              return (
                <button key={item} onClick={() => toggleItem(item)} style={{
                  padding: '8px 12px', borderRadius: 9999,
                  background: active ? 'var(--ink)' : 'var(--surface)',
                  color: active ? 'var(--accent)' : 'var(--ink)',
                  border: active ? '1px solid var(--ink)' : '1px solid var(--stroke-strong)',
                  fontSize: 12.5, fontWeight: 600,
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                }}>
                  {active && <IconCheck size={12} sw={2.6}/>}
                  {item}
                </button>
              );
            })}
          </div>
        )}

        {/* Custom items already selected */}
        {form.items.filter(i => !itemsForCategory.includes(i)).length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
            {form.items.filter(i => !itemsForCategory.includes(i)).map(item => (
              <button key={item} onClick={() => toggleItem(item)} style={{
                padding: '8px 12px', borderRadius: 9999,
                background: 'var(--ink)', color: 'var(--accent)',
                border: '1px solid var(--ink)',
                fontSize: 12.5, fontWeight: 600,
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}>
                <IconClose size={12} sw={2.4}/>
                {item}
              </button>
            ))}
          </div>
        )}

        {/* Add custom item */}
        <div style={{
          display: 'flex', gap: 8, alignItems: 'center',
          background: 'var(--surface)',
          border: `1px solid ${errors.items ? 'var(--warn)' : 'var(--stroke)'}`,
          borderRadius: 12, padding: '4px 4px 4px 12px',
          boxShadow: errors.items ? '0 0 0 3px rgba(232,146,75,0.18)' : 'none',
        }}>
          <input
            type="text"
            value={form.customItem}
            onChange={e => set('customItem', e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addCustomItem(); } }}
            placeholder="Tambah item lain (mis. Karpet, Wiper…)"
            style={{
              flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent',
              fontSize: 14, padding: '8px 0', color: 'var(--ink)',
            }}
          />
          <button onClick={addCustomItem} disabled={!form.customItem.trim()} style={{
            padding: '8px 12px', borderRadius: 9, fontSize: 12, fontWeight: 700,
            background: form.customItem.trim() ? 'var(--ink)' : 'rgba(23,22,20,0.05)',
            color: form.customItem.trim() ? 'var(--surface)' : 'var(--ink-mute)',
            cursor: form.customItem.trim() ? 'pointer' : 'not-allowed',
          }}>+ Tambah</button>
        </div>
        {errors.items && <div style={{ fontSize: 11.5, color: 'var(--warn)', fontWeight: 600, padding: '4px 6px 0' }}>Pilih minimal 1 item servis</div>}
      </div>

      {/* Cost + date */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        <FieldShell label="Biaya" hint="rupiah" error={errors.cost} errorMsg="Biaya wajib diisi">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 2 }}>
            <span className="mono" style={{ fontSize: 14, color: 'var(--ink-mute)', fontWeight: 600 }}>Rp</span>
            <input
              type="text"
              inputMode="numeric"
              value={form.cost ? Number(form.cost).toLocaleString('id-ID') : ''}
              onChange={e => set('cost', e.target.value.replace(/\D/g, ''))}
              placeholder="0"
              style={{
                flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent',
                fontFamily: 'JetBrains Mono, ui-monospace, monospace',
                fontSize: 20, fontWeight: 700, color: 'var(--ink)',
                padding: '2px 0', letterSpacing: '-0.01em',
              }}
            />
          </div>
        </FieldShell>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <FieldShell label="Tanggal">
            <input
              type="date"
              value={form.date}
              onChange={e => set('date', e.target.value)}
              style={{
                width: '100%', border: 'none', outline: 'none', background: 'transparent',
                fontFamily: 'JetBrains Mono, ui-monospace, monospace',
                fontSize: 14, fontWeight: 600, color: 'var(--ink)', padding: '4px 0',
              }}
            />
          </FieldShell>
          <FieldShell label="Odometer" hint="km">
            <TextField value={form.odo} onChange={v => set('odo', v.replace(/\D/g, ''))} placeholder="0" mono suffix="km"/>
          </FieldShell>
        </div>

        <FieldShell label="Bengkel" hint="opsional">
          <TextField value={form.station} onChange={v => set('station', v)} placeholder="mis. Honda Pondok Indah"/>
        </FieldShell>
      </div>

      {/* Summary preview */}
      {form.items.length > 0 && (
        <div style={{
          background: 'var(--ink)', color: 'var(--surface)', borderRadius: 14,
          padding: '12px 14px', marginBottom: 18,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', opacity: 0.6 }}>RINGKASAN</span>
            <span className="mono" style={{ fontSize: 16, fontWeight: 700, color: 'var(--accent)' }}>{totalCost ? fmtIDRfull(totalCost) : 'Rp 0'}</span>
          </div>
          <div style={{ fontSize: 12, opacity: 0.85, lineHeight: 1.45 }}>
            <span style={{ fontWeight: 700, color: 'var(--accent)' }}>{form.category}</span> · {form.items.join(' · ')}
          </div>
        </div>
      )}

      {/* Save */}
      <div style={{
        display: 'flex', gap: 10,
        animation: shake ? 'shake .42s cubic-bezier(.36,.07,.19,.97)' : 'none',
      }}>
        <button onClick={onClose} style={{
          flex: 1, height: 56, borderRadius: 16,
          background: 'transparent', border: '1px solid var(--stroke-strong)',
          fontSize: 15, fontWeight: 600,
        }}>Batal</button>
        <button onClick={handleSave} style={{
          flex: 2, height: 56, borderRadius: 16,
          background: hasError ? 'var(--warn)' : 'var(--accent)',
          color: hasError ? '#fff' : 'var(--accent-ink)',
          fontSize: 16, fontWeight: 700,
          boxShadow: hasError ? '0 8px 18px rgba(232,146,75,0.35)' : '0 8px 18px rgba(143,170,31,0.32)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          {hasError ? 'Lengkapi field di atas' : (<><IconCheck size={18} sw={2.4}/> Simpan servis</>)}
        </button>
      </div>
    </div>
  );
}
