import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// Added 'admin-dashboard', 'medical_records', and 'appointment_details' to ScreenState
type ScreenState = 'splash' | 'get-started' | 'login' | 'signup' | 'home' | 'event-details' | 'request-form' | 'profile' | 'appointment' | 'admin-dashboard' | 'medical_records' | 'appointment_details';

interface HealthEvent {
  id: number;
  title: string;
  date: string;
  desc: string;
}

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('splash');
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<HealthEvent | null>(null);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  
  // Auth States
  const [email, setEmail] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  // Form States
  const [formData, setFormData] = useState({
    name: '', age: '', contact: '', reason: '', medicine: '', qty: '', dosage: ''
  });

  useEffect(() => {
    if (screen === 'splash') {
      const timer = setTimeout(() => setScreen('get-started'), 2000);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  const events: HealthEvent[] = [
    { id: 1, title: 'Christmas Break', date: 'December 24-25, 2025', desc: 'Holiday Notice' },
    { id: 2, title: 'Resume Operations', date: 'January 02, 2026', desc: 'Center Announcement' },
    { id: 3, title: 'New Year Break', date: 'Dec 30 - Jan 01', desc: 'Holiday Notice' },
  ];

  // --- Handlers ---
  const handleLogin = () => {
    if (email.toLowerCase() === 'admin123') {
      setIsAdmin(true);
      setScreen('admin-dashboard');
    } else {
      setIsAdmin(false);
      setScreen('home');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setEmail('');
    setScreen('login');
  };

  // --- UI Components ---
  const Logo = ({ size = 'large' }: { size?: 'small' | 'large' }) => (
    <View style={styles.logoContainer}>
      <Image 
        source={require('../../assets/images/BHC LOGO.png')} 
        style={size === 'small' ? styles.logoImageSmall : styles.logoImageLarge}
        resizeMode="contain"
      />
    </View>
  );

  const BottomNav = () => (
    <View style={styles.bottomNav}>
      <TouchableOpacity onPress={() => setScreen('home')}>
        <Image source={require('../../assets/images/home.png')} style={styles.navAssetIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setScreen('appointment')}>
        <Image source={require('../../assets/images/schedule1.png')} style={styles.navAssetIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setScreen('request-form')}>
        <Image source={require('../../assets/images/exam.png')} style={styles.navAssetIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setScreen('profile')}>
        <Image source={require('../../assets/images/user.png')} style={styles.navAssetIcon} />
      </TouchableOpacity>
    </View>
  );

  // --- Render Logic ---

  if (screen === 'splash') return (
    <View style={styles.splashContainer}>
      <Logo size="large" /> 
    </View>
  );

  if (screen === 'get-started') return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerContent}>
        <Logo size="large" /> 
        <TouchableOpacity style={styles.primaryButton} onPress={() => setScreen('login')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* LOGIN & SIGNUP */}
          {(screen === 'login' || screen === 'signup') && (
            <View>
              <View style={styles.authHeader}>
                <Logo size="small" />
                <Text style={styles.instructionText}>
                  {screen === 'login' ? 'Please login with your account.' : 'Create your Account.'}
                </Text>
              </View>

              <Text style={styles.label}>Email <Text style={{color: 'red'}}>*</Text></Text>
              <View style={styles.inputContainer}>
                <TextInput 
                  style={styles.inputFieldInner} 
                  placeholder="Enter Email" 
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email} // FIX: Bound to state
                  onChangeText={setEmail} // FIX: Updates state
                />
              </View>

              <Text style={styles.label}>{screen === 'signup' ? 'Create Password' : 'Password'} *</Text>
              <View style={styles.inputContainer}>
                <TextInput 
                  style={styles.inputFieldInner} 
                  secureTextEntry={!isPasswordVisible} 
                  placeholder="Enter Password" 
                />
                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                  <Image source={require('../../assets/images/hide.png')} style={[styles.inputAssetIconRight, isPasswordVisible && {tintColor: '#00A3AD'}]} />
                </TouchableOpacity>
              </View>

              {screen === 'signup' && (
                <View>
                  <Text style={styles.label}>Confirm Password *</Text>
                  <View style={styles.inputContainer}>
                    <TextInput 
                      style={styles.inputFieldInner} 
                      secureTextEntry={!isConfirmVisible} 
                      placeholder="Confirm Password" 
                    />
                    <TouchableOpacity onPress={() => setIsConfirmVisible(!isConfirmVisible)}>
                      <Image source={require('../../assets/images/hide.png')} style={[styles.inputAssetIconRight, isConfirmVisible && {tintColor: '#00A3AD'}]} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>{screen === 'login' ? 'Log in' : 'SignUp'}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setScreen(screen === 'login' ? 'signup' : 'login')}>
                <Text style={styles.footerLink}>
                  {screen === 'login' ? "Don't have an account? Sign up" : "Already have an account? Login"}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* ADMIN DASHBOARD */}
{screen === 'admin-dashboard' && (
  <View>
    <Text style={styles.sectionTitle}>Administrator Panel</Text>
    
    {/* STAT CARDS */}
    <View style={styles.row}>
      <View style={[styles.statCard, {backgroundColor: '#D1E7DD'}]}>
        <Text style={styles.statNum}>12</Text>
        <Text style={styles.statLabel}>New Requests</Text>
      </View>
      <View style={[styles.statCard, {backgroundColor: '#CFE2FF'}]}>
        <Text style={styles.statNum}>05</Text>
        <Text style={styles.statLabel}>Appts Today</Text>
      </View>
    </View>

    {/* FEATURE 1: POST ANNOUNCEMENT */}
    <View style={[styles.adminCard, {marginTop: 20}]}>
      <Text style={styles.adminCardTitle}>📢 Post New Announcement</Text>
      <TextInput 
        style={styles.adminInput} 
        placeholder="Type announcement for users..." 
        multiline
      />
      <TouchableOpacity 
        style={styles.adminSubmitBtn} 
        onPress={() => Alert.alert('Success', 'Announcement posted to user home!')}
      >
        <Text style={styles.adminBtnText}>Broadcast to Users</Text>
      </TouchableOpacity>
    </View>

    {/* FEATURE 2: VIEW APPOINTMENTS */}
    <Text style={[styles.sectionTitle, {marginTop: 25}]}>📅 Upcoming Appointments</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{flexDirection: 'row'}}>
      {[
        {name: 'Gian Panesa', time: '10:00 AM', type: 'Check-up'},
        {name: 'Elena Cruz', time: '02:30 PM', type: 'Vaccination'}
      ].map((appt, i) => (
        <View key={i} style={styles.apptMiniCard}>
          <Text style={styles.apptName}>{appt.name}</Text>
          <Text style={styles.apptDetail}>{appt.time} | {appt.type}</Text>
          <TouchableOpacity onPress={() => Alert.alert('Confirmed')}>
            <Text style={{color: '#00A3AD', fontWeight: 'bold', marginTop: 5}}>Confirm</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>

    {/* FEATURE 3: MEDICINE REQUESTS */}
    <Text style={[styles.sectionTitle, {marginTop: 25}]}>💊 Medicine Requests</Text>
    {['Maria Santos', 'Joey de Leon'].map((name, i) => (
      <View key={i} style={styles.adminRequestCard}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.eventTitle}>{name}</Text>
          <Text style={{fontSize: 10, color: '#666'}}>2 mins ago</Text>
        </View>
        <Text style={styles.adminSubtext}>Requesting: Paracetamol (500mg) x 10</Text>
        <TouchableOpacity style={styles.viewIdLink}>
          <Text style={{color: '#005963', textDecorationLine: 'underline', fontSize: 12}}>View Q.C ID Attached</Text>
        </TouchableOpacity>
        <View style={[styles.row, {marginTop: 10}]}>
          <TouchableOpacity style={[styles.adminActionBtn, {backgroundColor: '#005963'}]} onPress={() => Alert.alert('Request Approved')}>
            <Text style={styles.adminBtnText}>Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.adminActionBtn, {backgroundColor: '#CC0000'}]} onPress={() => Alert.alert('Request Denied')}>
            <Text style={styles.adminBtnText}>Reject</Text>
          </TouchableOpacity>
        </View>
      </View>
    ))}

    <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
      <Text style={styles.buttonText}>Logout Administrator</Text>
    </TouchableOpacity>
  </View>
)}
          {/* HOME SCREEN */}
          {screen === 'home' && (
            <View>
              <View style={styles.headerRow}>
                <View style={styles.searchBar}>
                  <Image source={require('../../assets/images/search.png')} style={styles.searchIcon} />
                  <TextInput placeholder="Search..." style={styles.searchInputField} placeholderTextColor="#666" />
                </View>
                <TouchableOpacity><Image source={require('../../assets/images/notification.png')} style={styles.notificationIcon} /></TouchableOpacity>
              </View>
              <Text style={styles.sectionTitle}>Recent Events</Text>
              {events.map(ev => (
                <TouchableOpacity key={ev.id} style={styles.eventCard} onPress={() => { setSelectedEvent(ev); setScreen('event-details'); }}>
                  <Text style={styles.eventTitle}>{ev.title}</Text>
                  <Text style={styles.eventDate}>{ev.date}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* EVENT DETAILS */}
          {screen === 'event-details' && (
            <View>
              <TouchableOpacity onPress={() => setScreen('home')}>
                <Image source={require('../../assets/images/back.png')} style={styles.backAssetIcon} />
              </TouchableOpacity>
              <Text style={styles.detailHeaderTitle}>{selectedEvent?.title}</Text>
              <View style={styles.imagePlaceholder}><Text style={{color: '#999'}}>Health Center Image</Text></View>
            </View>
          )}

          {/* MEDICINE REQUEST FORM */}
          {screen === 'request-form' && (
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Medicine Request Form</Text>
              
              <Text style={styles.inputLabel}>Name:</Text>
              <View style={styles.inputBox}>
                <TextInput style={styles.formInputField} onChangeText={(val) => setFormData({...formData, name: val})} />
              </View>

              <View style={styles.row}>
                <View style={{flex: 1}}>
                  <Text style={styles.inputLabel}>Age:</Text>
                  <View style={styles.inputBox}>
                    <TextInput style={styles.formInputField} keyboardType="numeric" />
                  </View>
                </View>
                <View style={{flex: 1.5}}>
                  <Text style={styles.inputLabel}>Contact:</Text>
                  <View style={styles.inputBox}>
                    <TextInput style={styles.formInputField} keyboardType="phone-pad" />
                  </View>
                </View>
              </View>

              <Text style={styles.inputLabel}>Reason:</Text>
              <View style={styles.inputBox}>
                <TextInput style={styles.formInputField} />
              </View>

              <Text style={styles.inputLabel}>Medicine:</Text>
              <View style={styles.inputBox}>
                <TextInput style={styles.formInputField} />
              </View>

              <View style={styles.row}>
                <View style={{flex: 1}}>
                  <Text style={styles.inputLabel}>Qty:</Text>
                  <View style={styles.inputBox}>
                    <TextInput style={styles.formInputField} keyboardType="numeric" />
                  </View>
                </View>
                <View style={{flex: 1.5}}>
                  <Text style={styles.inputLabel}>Dosage:</Text>
                  <View style={styles.inputBox}>
                    <TextInput style={styles.formInputField} />
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.uploadBox}>
                <Text style={{fontSize: 20, marginRight: 10}}>☁️</Text>
                <Text style={styles.uploadLabelText}>Upload Q.C ID</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.uploadBox}>
                <Text style={{fontSize: 20, marginRight: 10}}>☁️</Text>
                <Text style={styles.uploadLabelText}>Upload Description</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.submitBtn} onPress={() => alert('Request Submitted Successfully!')}>
                <Text style={styles.submitBtnText}>Submit</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* APPOINTMENT SCREEN */}
          {screen === 'appointment' && (
            <View>
              <Text style={styles.appointmentHeader}>Select Date & Time</Text>
              <View style={styles.calendarContainer}>
                <Text style={styles.calendarMonth}>‹ JANUARY 2026 ›</Text>
                <View style={styles.calendarGrid}>
                  {[...Array(31)].map((_, i) => (
                    <View key={i} style={[styles.calendarDay, (i + 1) === 19 && styles.calendarDaySelected]}>
                      <Text style={(i + 1) === 19 ? {color: '#FFF'} : {color: '#333'}}>{i + 1}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <Text style={styles.sectionLabel}>Appointment Details:</Text>
              <TouchableOpacity style={styles.dropdown} onPress={() => setShowTypeDropdown(!showTypeDropdown)}>
                <Text style={{color: '#004D56'}}>Appointment Type</Text><Text>▼</Text>
              </TouchableOpacity>
              {showTypeDropdown && (
                <View style={styles.dropdownList}>
                  {['General Consultation', 'Medical Check-Up', 'Vaccination'].map((item) => (
                    <Text key={item} style={styles.dropdownItem}>{item}</Text>
                  ))}
                </View>
              )}
              <View style={styles.mapContainer}><View style={styles.mapPlaceholder}><Text>📍 Cubao Health Center Map</Text></View></View>
            </View>
          )}

  {/* PROFILE SCREEN */}
{screen === 'profile' && (
  <View style={{ flex: 1 }}>
    <Text style={styles.profileHeaderTitle}>Profile</Text>
    <View style={styles.profileImageContainer}>
      <View style={styles.profileImageBorder}>
        <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoQJYteTp57PNMLZk_nT9ggPAqEEnEVetpNw&s' }} style={styles.profileAvatar} />
      </View>
    </View>
    <View style={styles.infoBox}><Text style={styles.infoText}>Mark Gian P. Panesa</Text></View>
    <View style={styles.infoBox}><Text style={styles.infoText}>Brgy. Kaunlaran, Quezon City</Text></View>
    
    <Text style={styles.sectionHeading}>Active Schedule</Text>
    
    <TouchableOpacity 
      style={styles.appointmentCard} 
      onPress={() => setScreen('appointment_details')}
    >
      <Text style={styles.appointmentTitle}>📞 Call Consultation</Text>
      <Text style={styles.appointmentDetail}>Jan 23, 2026 | 10:00 AM</Text>
    </TouchableOpacity>

    <Text style={styles.healthSectionTitle}>Your Health</Text>
    <View style={styles.healthCard}>
      <TouchableOpacity style={styles.healthItem} onPress={() => setScreen('medical_records')}>
        <Text style={styles.healthItemText}>Medical Record</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.healthItem}><Text style={styles.healthItemText}>Allergies</Text></TouchableOpacity>
      <TouchableOpacity style={styles.healthItem}><Text style={styles.healthItemText}>View and Manage prescriptions</Text></TouchableOpacity>
    </View>

    {/* NEW LOGOUT BUTTON */}
    <TouchableOpacity 
      style={styles.logoutButton} 
      onPress={() => {
        // Logic to clear session could go here
        setScreen('login'); 
      }}
    >
      <Text style={styles.logoutText}>Log Out</Text>
    </TouchableOpacity>
  </View>
)}
{/* APPOINTMENT DETAILS SCREEN (THE ONE FROM THE IMAGE) */}
{screen === 'appointment_details' && (
  <View>
    <TouchableOpacity onPress={() => setScreen('profile')} style={{marginBottom: 10}}>
      <Text style={{fontSize: 24, color: '#004D56'}}>←</Text>
    </TouchableOpacity>

    <View style={styles.appointmentDetailCard}>
      <Text style={styles.detailTitle}>Your Appointment Schedule</Text>

      <View style={styles.detailRow}>
        <Text style={{fontSize: 24}}>📞</Text> 
        <Text style={styles.detailBoldText}>Call Consultation</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={{fontSize: 24}}>🕒</Text>
        <View>
          <Text style={styles.detailBoldText}>January 23, 2026</Text>
          <Text style={styles.detailSubText}>10:00 AM - 11:00 AM</Text>
        </View>
      </View>

      <Text style={styles.emergencyNote}>
        If emergency occurred, Please make sure to bring one of the following:
      </Text>

      <View style={styles.bulletList}>
        <Text style={styles.bulletItem}>• QC ID</Text>
        <Text style={styles.bulletItem}>• Philhealth</Text>
        <Text style={styles.bulletItem}>• Health Card</Text>
      </View>

      <TouchableOpacity style={styles.rescheduleBtn}>
        <Text style={styles.rescheduleText}>Reschedule</Text>
      </TouchableOpacity>
    </View>
  </View>
)}

{/* MEDICAL RECORDS SCREEN */}
{screen === 'medical_records' && (
  <View>
    <View style={styles.recordsHeader}>
      <TouchableOpacity onPress={() => setScreen('profile')}>
        <Text style={{ fontSize: 24, color: '#004D56', marginRight: 10 }}>←</Text>
      </TouchableOpacity>
      <View style={styles.recordsSearchBar}>
        <Text style={{ marginRight: 5 }}></Text>
        <TextInput placeholder="Search in Files" style={styles.recordsSearchInput} />
        <Text>🔍</Text>
      </View>
    </View>

    <TouchableOpacity style={styles.recordsMenuBtn}>
      <Text style={{ fontSize: 28, color: '#004D56', fontWeight: 'bold' }}>≡</Text>
    </TouchableOpacity>

    <View style={styles.recordsGrid}>
      {['Birth Certificate', 'Medical Certificate', 'Medical Records'].map((item, index) => (
        <View key={index} style={styles.docCard}>
          <View style={styles.docHeader}>
            <Text style={styles.docTitle}>{item}</Text>
            <Text style={{ color: '#004D56' }}>⋮</Text>
          </View>
          <View style={styles.docImagePlaceholder} />
        </View>
      ))}
    </View>

    <View style={styles.fabContainer}>
      <TouchableOpacity style={styles.addNewBtn}>
        <Text style={{ color: '#FFF', fontSize: 18 }}>+</Text>
        <Text style={styles.addNewText}>Add New</Text>
      </TouchableOpacity>
    </View>
  </View>
)}
        </ScrollView>
      </KeyboardAvoidingView>
      
      {/* Dynamic Nav Visibility */}
      {(['home', 'event-details', 'request-form', 'profile', 'appointment'].includes(screen)) && !isAdmin && <BottomNav />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ---  BASE LAYOUT & CONTAINERS ---
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  splashContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' },
  centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  scrollContent: { padding: 20, paddingBottom: 100 },
  row: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },

  // --- Added for Medical Records FAB Action Icons ---
  actionIconsRow: { flexDirection: 'row', gap: 15, alignItems: 'center', marginLeft: 15 },

  // --- AUTHENTICATION & BRANDING ---
  logoContainer: { alignItems: 'center', marginBottom: 10 },
  logoImageLarge: { width: 250, height: 250 },
  logoImageSmall: { width: 120, height: 120 },
  authHeader: { alignItems: 'center', marginBottom: 20 },
  instructionText: { textAlign: 'center', color: '#666', marginTop: 10 },
  footerLink: { textAlign: 'center', color: '#00A3AD', marginTop: 15 },

  // ---  FORMS & INPUT FIELDS ---
  label: { fontWeight: 'bold', color: '#004D56', marginTop: 15, marginBottom: 5, fontSize: 14 },
  inputLabel: { fontSize: 14, fontWeight: 'bold', color: '#005963', marginBottom: 5, marginLeft: 2 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#DDECEE', borderRadius: 10, paddingHorizontal: 12, marginBottom: 5, borderWidth: 1, borderColor: '#B0CFD2' },
  inputBox: { backgroundColor: '#DDECEE', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 4, borderWidth: 1, borderColor: '#B0CFD2', marginBottom: 15 },
  inputFieldInner: { flex: 1, paddingVertical: 12, color: '#004D56' },
  formInputField: { height: 40, color: '#004D56', fontSize: 15, padding: 0 },
  inputAssetIconRight: { width: 22, height: 22, resizeMode: 'contain', tintColor: '#666' },
  uploadBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#DDECEE', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: '#B0CFD2', marginBottom: 15, gap: 10 },
  uploadLabelText: { color: '#005963', fontWeight: '600' },
  formContainer: { backgroundColor: '#F0F7F8', borderRadius: 15, padding: 20 },
  formTitle: { fontSize: 18, fontWeight: 'bold', color: '#005963', textAlign: 'center', marginBottom: 20 },

  // ---  BUTTONS ---
  primaryButton: { backgroundColor: '#004D56', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20, width: '100%' },
  submitBtn: { backgroundColor: '#005963', padding: 12, borderRadius: 10, alignSelf: 'center', marginTop: 10, width: '60%', alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
  submitBtnText: { color: '#FFF', fontWeight: 'bold' },
  logoutBtn: { backgroundColor: '#CC0000', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },

  // --- HEADER & SEARCH ---
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20 },
  searchBar: { flex: 1, backgroundColor: '#DDECEE', padding: 10, borderRadius: 8, flexDirection: 'row', alignItems: 'center' },
  searchIcon: { width: 20, height: 20, tintColor: '#666', marginRight: 8 },
  searchInputField: { flex: 1, color: '#004D56' },
  notificationIcon: { width: 24, height: 24, tintColor: '#004D56' },
  backAssetIcon: { width: 24, height: 24, tintColor: '#004D56', marginBottom: 10 },

  // ---  cALENDAR & APPOINTMENTS ---
  appointmentHeader: { fontSize: 18, fontWeight: 'bold', color: '#004D56', marginBottom: 15 },
  calendarContainer: { backgroundColor: '#FFF', borderRadius: 12, padding: 15 },
  calendarMonth: { textAlign: 'center', fontWeight: 'bold', marginBottom: 10 },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  calendarDay: { width: 35, height: 35, justifyContent: 'center', alignItems: 'center', margin: 2 },
  calendarDaySelected: { backgroundColor: '#00A3AD', borderRadius: 17.5 },
  appointmentCard: { backgroundColor: '#004D56', padding: 15, borderRadius: 10 },
  appointmentTitle: { color: '#FFF', fontWeight: 'bold' },
  appointmentDetail: { color: '#DDECEE', fontSize: 12, marginTop: 5 },
  apptMiniCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 10, marginRight: 10, width: 160, borderWidth: 1, borderColor: '#DDECEE' },
  apptName: { fontWeight: 'bold', color: '#004D56' },
  apptDetail: { fontSize: 11, color: '#666' },

  // --- PROFILE & INFO ---
  profileHeaderTitle: { fontSize: 22, fontWeight: 'bold', color: '#004D56', textAlign: 'center' },
  profileImageContainer: { alignItems: 'center', marginVertical: 20 },
  profileImageBorder: { padding: 4, borderRadius: 60, borderWidth: 2, borderColor: '#00A3AD' },
  profileAvatar: { width: 100, height: 100, borderRadius: 50 },
  infoBox: { backgroundColor: '#DDECEE', padding: 15, borderRadius: 10, marginBottom: 10 },
  infoText: { color: '#004D56', fontWeight: '500' },
  statCard: { flex: 1, padding: 20, borderRadius: 12, alignItems: 'center' },
  statNum: { fontSize: 24, fontWeight: 'bold', color: '#004D56' },
  statLabel: { fontSize: 12, color: '#555' },

  logoutButton: { marginTop: 30, backgroundColor: '#fe0000', borderWidth: 1, borderColor: '#FF4D4D', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginHorizontal: 20, marginBottom: 20 },
  logoutText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },

  // --- 📅 APPOINTMENT DETAIL STYLES ---
  appointmentDetailCard: { backgroundColor: '#F0F7F8', borderRadius: 15, padding: 20, borderWidth: 1, borderColor: '#D1E5E7' },
  detailTitle: { fontSize: 18, fontWeight: 'bold', color: '#004D56', marginBottom: 20 },
  detailRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, gap: 15 },
  detailBoldText: { fontSize: 16, fontWeight: 'bold', color: '#004D56' },
  detailSubText: { fontSize: 15, color: '#004D56' },
  emergencyNote: { fontSize: 13, fontWeight: 'bold', color: '#004D56', marginTop: 10, lineHeight: 18 },
  bulletList: { marginTop: 10, paddingLeft: 10 },
  bulletItem: { fontSize: 14, color: '#004D56', marginBottom: 4, fontWeight: '500' },
  rescheduleBtn: { backgroundColor: '#005963', padding: 12, borderRadius: 10, alignItems: 'center', marginTop: 25, width: '60%', alignSelf: 'center' },
  rescheduleText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },

  // ---  HEALTH SECTION ---
  healthSectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#004D56', marginBottom: 10, marginTop: 20 },
  healthCard: { backgroundColor: '#CDE4E6', borderRadius: 12, padding: 20, borderWidth: 1, borderColor: '#9BBEBF' },
  healthItem: { paddingVertical: 10 },
  healthItemText: { fontSize: 16, fontWeight: 'bold', color: '#004D56' },

 // --- MEDICAL RECORDS STYLES ---
  recordsHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  recordsSearchBar: { flex: 1, backgroundColor: '#B2D6D8', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, borderRadius: 10, height: 45 },
  recordsSearchInput: { flex: 1, color: '#004D56', fontSize: 14 },
  recordsMenuBtn: { marginBottom: 15 },
  recordsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingBottom: 20 },
  docCard: { width: '48%', backgroundColor: '#B2D6D8', borderRadius: 20, marginBottom: 20, overflow: 'hidden', borderWidth: 1, borderColor: '#9DBEBF' },
  docHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 },
  docTitle: { fontSize: 11, fontWeight: 'bold', color: '#004D56', flex: 1 },
  docImagePlaceholder: { width: '100%', height: 150, backgroundColor: '#FFF' },
  fabContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 },
  addNewBtn: { backgroundColor: '#004D56', flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 18, borderRadius: 25 },
  addNewText: { color: '#FFF', fontWeight: 'bold', marginLeft: 8 },
  bottomActionIcons: { flexDirection: 'row', gap: 15 },
  
  // ---  LISTS & CARDS ---
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#004D56', marginBottom: 15 },
  sectionHeading: { fontSize: 16, fontWeight: 'bold', color: '#004D56', marginTop: 15, marginBottom: 10 },
  sectionLabel: { fontWeight: 'bold', color: '#004D56', marginTop: 20, marginBottom: 10 },
  eventCard: { backgroundColor: '#DDECEE', padding: 15, borderRadius: 10, marginBottom: 12 },
  eventTitle: { fontWeight: 'bold', color: '#004D56' },
  eventDate: { color: '#00A3AD', fontSize: 12 },
  detailHeaderTitle: { fontSize: 22, fontWeight: 'bold', color: '#004D56', marginBottom: 10 },
  imagePlaceholder: { height: 180, backgroundColor: '#E0E0E0', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },

  // --- DROPDOWNS ---
  dropdown: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#DDECEE', padding: 12, borderRadius: 8 },
  dropdownList: { backgroundColor: '#FFF', padding: 10, borderRadius: 8, marginTop: 5, borderWidth: 1, borderColor: '#DDECEE' },
  dropdownItem: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },

  // --- MAPS ---
  mapContainer: { marginTop: 20, height: 150, borderRadius: 12, overflow: 'hidden' },
  mapPlaceholder: { flex: 1, backgroundColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center' },

  // --- ADMIN CONTROLS ---
  adminCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#DDECEE', elevation: 2 },
  adminCardTitle: { fontWeight: 'bold', color: '#004D56', marginBottom: 10 },
  adminInput: { backgroundColor: '#F8F9FA', borderRadius: 8, padding: 10, height: 60, textAlignVertical: 'top', borderWidth: 1, borderColor: '#EEE' },
  adminSubmitBtn: { backgroundColor: '#00A3AD', padding: 10, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  adminActionBtn: { flex: 1, padding: 10, borderRadius: 8, alignItems: 'center' },
  adminRequestCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#DDECEE' },
  adminSubtext: { fontSize: 12, color: '#666', marginTop: 5 },
  adminBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  viewIdLink: { marginVertical: 5 },

  // ---  NAVIGATION ---
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, backgroundColor: '#82C4C3', position: 'absolute', bottom: 0, width: '100%' },
  navAssetIcon: { width: 26, height: 26, tintColor: '#FFFFFF' },
});