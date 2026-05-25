import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  users,
  initialOpportunities,
  companies,
  contacts,
  initialAlerts,
  initialEvents,
  initialEmails,
  initialFiles,
  executives,
} from '../data/mockData';

const useAppStore = create(
  persist(
    (set, get) => ({
      // ─── Auth ─────────────────────────────────────────────────────────────
      currentUser: null,

      setUser: (role) => {
        set({ currentUser: users[role] });
      },

      logout: () => {
        set({ currentUser: null });
      },

      // ─── Core data ────────────────────────────────────────────────────────
      opportunities: initialOpportunities,
      companies,
      contacts,
      executives,
      alerts: initialAlerts,
      events: initialEvents,
      emails: initialEmails,
      files: initialFiles,

      // ─── UI state ─────────────────────────────────────────────────────────
      b2buddyOpen: false,
      notificationCount: 8,
      forecastUpdated: false,

      toggleB2Buddy: () => set((s) => ({ b2buddyOpen: !s.b2buddyOpen })),
      openB2Buddy: () => set({ b2buddyOpen: true }),
      closeB2Buddy: () => set({ b2buddyOpen: false }),

      // ─── Opportunities ────────────────────────────────────────────────────
      updateOpportunity: (id, changes) => {
        set((s) => ({
          opportunities: s.opportunities.map((o) =>
            o.id === id ? { ...o, ...changes, daysSinceContact: 0, lastContact: new Date().toISOString().split('T')[0] } : o
          ),
        }));
      },

      addActivity: (opportunityId, activity) => {
        set((s) => ({
          opportunities: s.opportunities.map((o) =>
            o.id === opportunityId
              ? {
                  ...o,
                  activities: [
                    { id: `act-${Date.now()}`, ...activity, date: new Date().toISOString().split('T')[0] },
                    ...o.activities,
                  ],
                }
              : o
          ),
        }));
      },

      addCommitment: (opportunityId, commitment) => {
        set((s) => ({
          opportunities: s.opportunities.map((o) =>
            o.id === opportunityId
              ? { ...o, commitments: [...o.commitments, commitment] }
              : o
          ),
        }));
      },

      // ─── Alerts ───────────────────────────────────────────────────────────
      dismissAlert: (id) => {
        set((s) => ({
          alerts: s.alerts.map((a) => (a.id === id ? { ...a, resolved: true } : a)),
          notificationCount: Math.max(0, s.notificationCount - 1),
        }));
      },

      addAlert: (alert) => {
        set((s) => ({
          alerts: [{ id: `alert-${Date.now()}`, resolved: false, ...alert }, ...s.alerts],
          notificationCount: s.notificationCount + 1,
        }));
      },

      // ─── Events ───────────────────────────────────────────────────────────
      addEvent: (event) => {
        set((s) => ({
          events: [...s.events, { id: `evt-${Date.now()}`, ...event }],
        }));
      },

      // ─── Emails ───────────────────────────────────────────────────────────
      addEmail: (email) => {
        set((s) => ({
          emails: [
            {
              id: `email-${Date.now()}`,
              date: new Date().toISOString().split('T')[0],
              status: 'draft',
              isNew: true,
              ...email,
            },
            ...s.emails,
          ],
        }));
      },

      markEmailSent: (id) => {
        set((s) => ({
          emails: s.emails.map((e) => (e.id === id ? { ...e, status: 'enviado', isNew: false } : e)),
        }));
      },

      // ─── Files ────────────────────────────────────────────────────────────
      addFile: (file) => {
        set((s) => ({
          files: [
            {
              id: `file-${Date.now()}`,
              date: new Date().toISOString().split('T')[0],
              uploader: s.currentUser?.name || 'Usuario',
              ...file,
            },
            ...s.files,
          ],
        }));
      },

      // ─── Demo: Apply B2Buddy changes ──────────────────────────────────────
      applyDemoChanges: (result) => {
        const { opportunityId, changes, event, emailSubject, emailBody, commitments } = result;
        const state = get();

        // Update opportunity
        state.updateOpportunity(opportunityId, changes);

        // Add activity
        state.addActivity(opportunityId, {
          type: 'reunion',
          text: 'Reunión presencial con Carlos Benavides – confirmó interés en prueba técnica Shell Rimula. Volumen actualizado a 42.000 L. Etapa avanzada a Negotiate.',
          executiveName: state.currentUser?.name || 'Paola Fernández',
        });

        // Add commitments
        commitments.forEach((c) => state.addCommitment(opportunityId, c));

        // Add calendar event
        state.addEvent({
          ...event,
          opportunityId,
          source: 'b2buddy',
          executiveId: state.currentUser?.executiveId || 'exec-paola',
        });

        // Add email
        state.addEmail({
          subject: emailSubject,
          body: emailBody,
          company: 'Minera Andina del Sur S.A.C.',
          opportunityId,
          to: 'c.benavides@mineraandina.com.pe',
          from: state.currentUser?.email || 'p.fernandez@shell-primax.com.pe',
          status: 'draft',
          isNew: true,
        });

        // Dismiss the "sin contacto" alert for this opportunity
        set((s) => ({
          alerts: s.alerts.map((a) =>
            a.opportunityId === opportunityId && a.type === 'sin_contacto'
              ? { ...a, resolved: true }
              : a
          ),
          forecastUpdated: true,
        }));
      },

      resetDemo: () => {
        set({
          opportunities: initialOpportunities,
          alerts: initialAlerts,
          events: initialEvents,
          emails: initialEmails,
          files: initialFiles,
          forecastUpdated: false,
          notificationCount: 8,
        });
      },
    }),
    {
      name: 'symphony-demo-store',
      partialize: (state) => ({
        currentUser: state.currentUser,
        opportunities: state.opportunities,
        alerts: state.alerts,
        events: state.events,
        emails: state.emails,
        files: state.files,
        forecastUpdated: state.forecastUpdated,
        notificationCount: state.notificationCount,
      }),
    }
  )
);

export default useAppStore;
