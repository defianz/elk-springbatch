"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
// Note for translators and programmers
// Examples of these strings are all of the form
// Session {session.id} {primary} as {secondary}@{hostname} in {folder} was authorized to use {executable} with result {result.success/failure}
// E.x. Session 5 Frank as root@server-1 in /root was authorized to use wget with result success
// However, the strings can be dropped depending on the circumstances of the variables. For example, with no data at all
// Session 10
// Example with just a user name and hostname
// Session 20 frank@server-1
// Example with user name, hostname, but no result
// Session 20 frank@server-1 acquired credentials to curl
exports.SESSION = i18n_1.i18n.translate('xpack.siem.auditd.sessionDescription', {
    defaultMessage: 'Session',
});
exports.WAS_AUTHORIZED_TO_USE = i18n_1.i18n.translate('xpack.siem.auditd.wasAuthorizedToUseDescription', {
    defaultMessage: 'was authorized to use',
});
exports.ACQUIRED_CREDENTIALS_TO = i18n_1.i18n.translate('xpack.siem.auditd.acquiredCredentialsDescription', {
    defaultMessage: 'acquired credentials to',
});
exports.ENDED_FROM = i18n_1.i18n.translate('xpack.siem.auditd.endedFromDescription', {
    defaultMessage: 'ended from',
});
exports.STARTED = i18n_1.i18n.translate('xpack.siem.auditd.startedAtDescription', {
    defaultMessage: 'started',
});
exports.DISPOSED_CREDENTIALS_TO = i18n_1.i18n.translate('xpack.siem.auditd.disposedCredentialsDescription', {
    defaultMessage: 'disposed credentials to',
});
exports.ATTEMPTED_LOGIN = i18n_1.i18n.translate('xpack.siem.auditd.attemptedLoginDescription', {
    defaultMessage: 'attempted a login via',
});
exports.WITH_RESULT = i18n_1.i18n.translate('xpack.siem.auditd.withResultDescription', {
    defaultMessage: 'with result',
});
exports.EXECUTED = i18n_1.i18n.translate('xpack.siem.auditd.executedDescription', {
    defaultMessage: 'executed',
});
exports.AS = i18n_1.i18n.translate('xpack.siem.auditd.asDescription', {
    defaultMessage: 'as',
});
exports.CONNECTED_USING = i18n_1.i18n.translate('xpack.siem.auditd.connectedUsingDescription', {
    defaultMessage: 'connected using',
});
exports.USING = i18n_1.i18n.translate('xpack.siem.auditd.usingDescription', {
    defaultMessage: 'using',
});
exports.OPENED_FILE = i18n_1.i18n.translate('xpack.siem.auditd.OpenedFileDescription', {
    defaultMessage: 'opened file',
});
exports.CHANGED_FILE_ATTRIBUTES_OF = i18n_1.i18n.translate('xpack.siem.auditd.ChangedFileAttributesOfDescription', {
    defaultMessage: 'changed file attributes of',
});
exports.CHANGED_FILE_PERMISSIONS_OF = i18n_1.i18n.translate('xpack.siem.auditd.changedFilePermissionOfDescription', {
    defaultMessage: 'changed file permissions of',
});
exports.CHANGED_FILE_OWNERSHIP_OF = i18n_1.i18n.translate('xpack.siem.auditd.changeidleOwernshipOfDescription', {
    defaultMessage: 'changed file ownership of',
});
exports.LOADED_KERNEL_MODULE = i18n_1.i18n.translate('xpack.siem.auditd.loaedKernelModuleOfDescription', {
    defaultMessage: 'loaded kernel module of',
});
exports.UNLOADED_KERNEL_MODULE_OF = i18n_1.i18n.translate('xpack.siem.auditd.unloadedKernelModuleOfDescription', {
    defaultMessage: 'unloaded kernel module of',
});
exports.CREATED_DIRECTORY = i18n_1.i18n.translate('xpack.siem.auditd.createdDirectoryDescription', {
    defaultMessage: 'created directory',
});
exports.MOUNTED = i18n_1.i18n.translate('xpack.siem.auditd.mountedDescription', {
    defaultMessage: 'mounted',
});
exports.RENAMED = i18n_1.i18n.translate('xpack.siem.auditd.renamedDescription', {
    defaultMessage: 'renamed',
});
exports.CHECKED_METADATA_OF = i18n_1.i18n.translate('xpack.siem.auditd.chedckedMetaDataOfDescription', {
    defaultMessage: 'checked metadata of',
});
exports.CHECKED_FILE_SYSTEM_METADATA_OF = i18n_1.i18n.translate('xpack.siem.auditd.checkedFileSystemMetadataOfDescription', {
    defaultMessage: 'checked filesystem metadata of',
});
exports.SYMLINKED = i18n_1.i18n.translate('xpack.siem.auditd.symLinkedDescription', {
    defaultMessage: 'symbolically linked',
});
exports.UNMOUNTED = i18n_1.i18n.translate('xpack.siem.auditd.unmountedDescription', {
    defaultMessage: 'unmounted',
});
exports.DELETED = i18n_1.i18n.translate('xpack.siem.auditd.deletedDescription', {
    defaultMessage: 'deleted',
});
exports.CHANGED_TIME_STAMP_OF = i18n_1.i18n.translate('xpack.siem.auditd.changedTimeStampOfDescription', {
    defaultMessage: 'changed time stamp of',
});
exports.LISTEN_FOR_CONNECTIONS = i18n_1.i18n.translate('xpack.siem.auditd.ListeningForConnectionsUsingDescription', {
    defaultMessage: 'listening for connections using',
});
exports.BOUND_SOCKET_FROM = i18n_1.i18n.translate('xpack.siem.auditd.boundSocketFromDescription', {
    defaultMessage: 'bound socket from',
});
exports.RECEIVED_FROM = i18n_1.i18n.translate('xpack.siem.auditd.receivedFromDescription', {
    defaultMessage: 'received from',
});
exports.SENT_TO = i18n_1.i18n.translate('xpack.siem.auditd.sentToDescription', {
    defaultMessage: 'sent to',
});
exports.KILLED_PROCESS_ID_OF = i18n_1.i18n.translate('xpack.siem.auditd.killedProcessIdDescription', {
    defaultMessage: 'killed process id of',
});
exports.CHANGED_IDENTITY_USING = i18n_1.i18n.translate('xpack.siem.auditd.changedIdentityUsingDescription', {
    defaultMessage: 'changed identity using',
});
exports.CHANGED_SYSTEM_TIME_WITH = i18n_1.i18n.translate('xpack.siem.auditd.changedSystemTimeWithDescription', {
    defaultMessage: 'changed system time with',
});
exports.MADE_DEVICE_WITH = i18n_1.i18n.translate('xpack.siem.auditd.madeDeviceWithDescription', {
    defaultMessage: 'made device with',
});
exports.CHANGED_SYSTEM_NAME = i18n_1.i18n.translate('xpack.siem.auditd.changedSystemNameDescription', {
    defaultMessage: 'changed system name',
});
exports.ALLOCATED_MEMORY_FOR = i18n_1.i18n.translate('xpack.siem.auditd.allocatedMemoryForDescription', {
    defaultMessage: 'allocated memory for',
});
exports.SCHEDULED_POLICY_OF = i18n_1.i18n.translate('xpack.siem.auditd.scheduledPolicyOFDescription', {
    defaultMessage: 'scheduled policy of',
});
exports.ADDED_USER_ACCOUNT = i18n_1.i18n.translate('xpack.siem.auditd.addedUserAccountDescription', {
    defaultMessage: 'added user account',
});
exports.CAUSED_MAC_POLICY_ERROR = i18n_1.i18n.translate('xpack.siem.auditd.causedMacPolicyErrorDescription', {
    defaultMessage: 'caused mac policy error',
});
exports.LOADED_FIREWALL_RULE = i18n_1.i18n.translate('xpack.siem.auditd.loadedFirewallRuleDescription', {
    defaultMessage: 'loaded firewall rule',
});
exports.CHANGED_PROMISCUOUS_MODE = i18n_1.i18n.translate('xpack.siem.auditd.promiscuousModeDescription', {
    defaultMessage: 'changed promiscuous mode on the device using',
});
exports.LOCKED_ACCOUNT = i18n_1.i18n.translate('xpack.siem.auditd.lockedAccountDescription', {
    defaultMessage: 'locked account',
});
exports.UNLOCKED_ACCOUNT = i18n_1.i18n.translate('xpack.siem.auditd.unlockedAccountDescription', {
    defaultMessage: 'unlocked account',
});
exports.ADDED_GROUP_ACCOUNT_USING = i18n_1.i18n.translate('xpack.siem.auditd.adddedGroupAccountUsingDescription', {
    defaultMessage: 'added group account using',
});
exports.CRASHED_PROGRAM = i18n_1.i18n.translate('xpack.siem.auditd.crashedProgramDescription', {
    defaultMessage: 'crashed program',
});
exports.EXECUTION_OF_FORBIDDEN_PROGRAM = i18n_1.i18n.translate('xpack.siem.auditd.executionOfForbiddenProgramDescription', {
    defaultMessage: 'execution of forbidden program',
});
exports.USED_SUSPICIOUS_PROGRAM = i18n_1.i18n.translate('xpack.siem.auditd.suspiciousProgramDescription', {
    defaultMessage: 'used suspicious program',
});
exports.FAILED_LOGIN_TOO_MANY_TIMES = i18n_1.i18n.translate('xpack.siem.auditd.failedLoginTooManyTimesDescription', {
    defaultMessage: 'failed login due to logging in too many times',
});
exports.ATTEMPTED_LOGIN_FROM_UNUSUAL_PLACE = i18n_1.i18n.translate('xpack.siem.auditd.attemptedLoginFromUnusalPlaceDescription', {
    defaultMessage: 'attempted login from unusual place',
});
exports.OPENED_TOO_MANY_SESSIONS = i18n_1.i18n.translate('xpack.siem.auditd.openedTooManySessionsDescription', {
    defaultMessage: 'opened too many sessions',
});
exports.ATTEMPTED_LOGIN_FROM_UNUSUAL_HOUR = i18n_1.i18n.translate('xpack.siem.auditd.attemptedLoginFromUnusualHourDescription', {
    defaultMessage: 'attempted login from unusual hour',
});
exports.TESTED_FILE_SYSTEM_INTEGRITY = i18n_1.i18n.translate('xpack.siem.auditd.testedFileSystemIntegrityDescription', {
    defaultMessage: 'tested file system integrity',
});
exports.VIOLATED_SELINUX_POLICY = i18n_1.i18n.translate('xpack.siem.auditd.violatedSeLinuxPolicyDescription', {
    defaultMessage: 'violated selinux policy',
});
exports.VIOLATED_APP_ARMOR_POLICY_FROM = i18n_1.i18n.translate('xpack.siem.auditd.violatedAppArmorPolicyFromDescription', {
    defaultMessage: 'violated app armor policy from',
});
exports.CHANGED_GROUP = i18n_1.i18n.translate('xpack.siem.auditd.changedGroupDescription', {
    defaultMessage: 'changed group',
});
exports.CHANGED_USER_ID = i18n_1.i18n.translate('xpack.siem.auditd.changedUserIdDescription', {
    defaultMessage: 'changed user id',
});
exports.CHANGED_AUDIT_CONFIGURATION = i18n_1.i18n.translate('xpack.siem.auditd.changedAuditConfigurationDescription', {
    defaultMessage: 'changed audit configuration',
});
exports.REFRESHED_CREDENTIALS_FOR = i18n_1.i18n.translate('xpack.siem.auditd.refreshedCredentialsForDescription', {
    defaultMessage: 'refreshed credentials for',
});
exports.NEGOTIATED_CRYPTO_KEY = i18n_1.i18n.translate('xpack.siem.auditd.negotiatedCryptoKeyDescription', {
    defaultMessage: 'negotiated crypto key',
});
exports.CRYPTO_OFFICER_LOGGED_IN = i18n_1.i18n.translate('xpack.siem.auditd.cryptoOfficerLoggedInDescription', {
    defaultMessage: 'crypto officer logged in',
});
exports.CRYPTO_OFFICER_LOGGED_OUT = i18n_1.i18n.translate('xpack.siem.auditd.cryptoOfficerLoggedOutDescription', {
    defaultMessage: 'crypto officer logged out',
});
exports.STARTED_CRYPTO_SESSION = i18n_1.i18n.translate('xpack.siem.auditd.startedCryptoSessionDescription', {
    defaultMessage: 'started crypto session',
});
exports.ACCESS_RESULT = i18n_1.i18n.translate('xpack.siem.auditd.accessResultDescription', {
    defaultMessage: 'access result',
});
exports.ABORTED_AUDIT_STARTUP = i18n_1.i18n.translate('xpack.siem.auditd.abortedAuditStartupDescription', {
    defaultMessage: 'aborted audit startup',
});
exports.REMOTE_AUDIT_CONNECTED = i18n_1.i18n.translate('xpack.siem.auditd.remoteAuditConnectedDescription', {
    defaultMessage: 'remote audit connected',
});
exports.REMOTE_AUDIT_DISCONNECTED = i18n_1.i18n.translate('xpack.siem.auditd.remoteAuditDisconnectedDescription', {
    defaultMessage: 'remote audit disconnected',
});
exports.SHUTDOWN_AUDIT = i18n_1.i18n.translate('xpack.siem.auditd.shutDownAuditDescription', {
    defaultMessage: 'shutdown audit',
});
exports.AUDIT_ERROR = i18n_1.i18n.translate('xpack.siem.auditd.auditErrorDescription', {
    defaultMessage: 'audit error',
});
exports.RECONFIGURED_AUDIT = i18n_1.i18n.translate('xpack.siem.auditd.reconfiguredAuditDescription', {
    defaultMessage: 'reconfigured audit',
});
exports.RESUMED_AUDIT_LOGGING = i18n_1.i18n.translate('xpack.siem.auditd.resumedAuditLoggingDescription', {
    defaultMessage: 'resumed audit logging',
});
exports.ROTATED_AUDIT_LOGS = i18n_1.i18n.translate('xpack.siem.auditd.rotatedAuditLogsDescription', {
    defaultMessage: 'rotated-audit-logs',
});
exports.STARTED_AUDIT = i18n_1.i18n.translate('xpack.siem.auditd.startedAuditDescription', {
    defaultMessage: 'started audit',
});
exports.DELETED_GROUP_ACCOUNT_USING = i18n_1.i18n.translate('xpack.siem.auditd.deletedGroupAccountUsingDescription', {
    defaultMessage: 'deleted group account using',
});
exports.DELETED_USER_ACCOUNT_USING = i18n_1.i18n.translate('xpack.siem.auditd.deletedUserAccountUsingDescription', {
    defaultMessage: 'deleted user account using',
});
exports.CHANGED_AUDIT_FEATURE = i18n_1.i18n.translate('xpack.siem.auditd.changedAuditFeatureDescription', {
    defaultMessage: 'changed audit feature',
});
exports.RELABELED_FILESYSTEM = i18n_1.i18n.translate('xpack.siem.auditd.relabeledFileSystemDescription', {
    defaultMessage: 'relabeled filesystem',
});
exports.AUTHENTICATED_TO_GROUP = i18n_1.i18n.translate('xpack.siem.auditd.authenticatedToGroupDescription', {
    defaultMessage: 'authenticated to group',
});
exports.CHANGED_GROUP_PASSWORD = i18n_1.i18n.translate('xpack.siem.auditd.changedGroupPasswordDescription', {
    defaultMessage: 'changed group password',
});
exports.MODIFIED_GROUP_ACCOUNT = i18n_1.i18n.translate('xpack.siem.auditd.modifiedGroupAccountDescription', {
    defaultMessage: 'modified group account',
});
exports.INITIALIZED_AUDIT_SUBSYSTEM = i18n_1.i18n.translate('xpack.siem.auditd.initializedAuditSubsystemDescription', {
    defaultMessage: 'initialized audit subsystem',
});
exports.MODIFIED_LEVEL_OF = i18n_1.i18n.translate('xpack.siem.auditd.modifiedLevelOfDescription', {
    defaultMessage: 'modified level of',
});
exports.OVERRODE_LABEL_OF = i18n_1.i18n.translate('xpack.siem.auditd.overrodeLabelOfDescription', {
    defaultMessage: 'overrode label of',
});
exports.CHANGED_LOGIN_ID_TO = i18n_1.i18n.translate('xpack.siem.auditd.changedLoginIdToDescription', {
    defaultMessage: 'changed login id to',
});
exports.MAC_PERMISSION = i18n_1.i18n.translate('xpack.siem.auditd.macPermissionDescription', {
    defaultMessage: 'mac permission',
});
exports.CHANGED_SELINUX_BOOLEAN = i18n_1.i18n.translate('xpack.siem.auditd.changedSeLinuxBooleanDescription', {
    defaultMessage: 'changed selinux boolean',
});
exports.LOADED_SELINUX_POLICY = i18n_1.i18n.translate('xpack.siem.auditd.loadedSeLinuxPolicyDescription', {
    defaultMessage: 'loaded selinux policy',
});
exports.CHANGED_SELINUX_ENFORCEMENT = i18n_1.i18n.translate('xpack.siem.auditd.changedSelinuxEnforcementDescription', {
    defaultMessage: 'changed selinux enforcement',
});
exports.ASSIGNED_USER_ROLE_TO = i18n_1.i18n.translate('xpack.siem.auditd.assignedUserRoleToDescription', {
    defaultMessage: 'assigned user role to',
});
exports.MODIFIED_ROLE = i18n_1.i18n.translate('xpack.siem.auditd.modifiedRoleDescription', {
    defaultMessage: 'modified role',
});
exports.REMOVED_USER_ROLE_FROM = i18n_1.i18n.translate('xpack.siem.auditd.removedUserRoleFromDescription', {
    defaultMessage: 'removed user role from',
});
exports.VIOLATED_SECCOMP_POLICY_WITH = i18n_1.i18n.translate('xpack.siem.auditd.violatedSeccompPolicyWithDescription', {
    defaultMessage: 'violated seccomp policy with',
});
exports.STARTED_SERVICE = i18n_1.i18n.translate('xpack.siem.auditd.startedServiceDescription', {
    defaultMessage: 'started service',
});
exports.STOPPED_SERVICE = i18n_1.i18n.translate('xpack.siem.auditd.stoppedServiceDescription', {
    defaultMessage: 'stopped service',
});
exports.BOOTED_SYSTEM = i18n_1.i18n.translate('xpack.siem.auditd.bootedSystemDescription', {
    defaultMessage: 'booted system',
});
exports.CHANGED_TO_RUN_LEVEL_WITH = i18n_1.i18n.translate('xpack.siem.auditd.changedToRunLevelWithDescription', {
    defaultMessage: 'changed to run level with',
});
exports.SHUTDOWN_SYSTEM = i18n_1.i18n.translate('xpack.siem.auditd.shutdownSystemDescription', {
    defaultMessage: 'shutdown system',
});
exports.SENT_TEST = i18n_1.i18n.translate('xpack.siem.auditd.sentTestDescription', {
    defaultMessage: 'sent test',
});
exports.UNKNOWN = i18n_1.i18n.translate('xpack.siem.auditd.unknownDescription', {
    defaultMessage: 'unknown',
});
exports.SENT_MESSAGE = i18n_1.i18n.translate('xpack.siem.auditd.sentMessageDescription', {
    defaultMessage: 'sent message',
});
exports.ACCESS_PERMISSION = i18n_1.i18n.translate('xpack.siem.auditd.accessPermissionDescription', {
    defaultMessage: 'access permission',
});
exports.AUTHENTICATED_USING = i18n_1.i18n.translate('xpack.siem.auditd.authenticatedUsingDescription', {
    defaultMessage: 'authenticated using',
});
exports.CHANGED_PASSWORD_WITH = i18n_1.i18n.translate('xpack.siem.auditd.changedPasswordWithDescription', {
    defaultMessage: 'changed password with',
});
exports.RAN_COMMAND = i18n_1.i18n.translate('xpack.siem.auditd.ranCommandDescription', {
    defaultMessage: 'ran command',
});
exports.ERROR_FROM = i18n_1.i18n.translate('xpack.siem.auditd.errorFromDescription', {
    defaultMessage: 'error from',
});
exports.LOGGED_OUT = i18n_1.i18n.translate('xpack.siem.auditd.loggedOutDescription', {
    defaultMessage: 'logged out',
});
exports.CHANGED_MAC_CONFIGURATION = i18n_1.i18n.translate('xpack.siem.auditd.changedMacConfigurationDescription', {
    defaultMessage: 'changed mac configuration',
});
exports.LOADED_MAC_POLICY = i18n_1.i18n.translate('xpack.siem.auditd.loadedMacPolicyDescription', {
    defaultMessage: 'loaded mac policy',
});
exports.MODIFIED_USER_ACCOUNT = i18n_1.i18n.translate('xpack.siem.auditd.modifiedUserAccountDescription', {
    defaultMessage: 'modified user account',
});
exports.CHANGED_ROLE_USING = i18n_1.i18n.translate('xpack.siem.auditd.changedRoleUsingDescription', {
    defaultMessage: 'changed role using',
});
exports.ACCESS_ERROR = i18n_1.i18n.translate('xpack.siem.auditd.accessErrorDescription', {
    defaultMessage: 'access error',
});
exports.CHANGED_CONFIGURATION_WITH = i18n_1.i18n.translate('xpack.siem.auditd.changedConfigurationWIthDescription', {
    defaultMessage: 'changed configuration with',
});
exports.ISSUED_VM_CONTROL = i18n_1.i18n.translate('xpack.siem.auditd.issuedVmControlDescription', {
    defaultMessage: 'issued vm control',
});
exports.CREATED_VM_IMAGE = i18n_1.i18n.translate('xpack.siem.auditd.createdVmImageDescription', {
    defaultMessage: 'created vm image',
});
exports.DELETED_VM_IMAGE = i18n_1.i18n.translate('xpack.siem.auditd.deletedVmImageDescription', {
    defaultMessage: 'deleted vm image',
});
exports.CHECKED_INTEGRITY_OF = i18n_1.i18n.translate('xpack.siem.auditd.checkedIntegrityOfDescription', {
    defaultMessage: 'checked integrity of',
});
exports.ASSIGNED_VM_ID = i18n_1.i18n.translate('xpack.siem.auditd.assignedVmIdDescription', {
    defaultMessage: 'assigned vm id',
});
exports.MIGRATED_VM_FROM = i18n_1.i18n.translate('xpack.siem.auditd.migratedVmFromDescription', {
    defaultMessage: 'migrated vm from',
});
exports.MIGRATED_VM_TO = i18n_1.i18n.translate('xpack.siem.auditd.migratedVmToDescription', {
    defaultMessage: 'migrated vm to',
});
exports.ASSIGNED_VM_RESOURCE = i18n_1.i18n.translate('xpack.siem.auditd.assignedVMResourceDescription', {
    defaultMessage: 'assigned vm resource',
});
