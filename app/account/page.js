

          {isEditing && (
            <div className="flex gap-4 mt-8">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    name: profile?.name || '',
                    business_name: profile?.business_name || '',
                    email: profile?.email || user?.email || '',
                  });
                }}
                className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
          <h2 className="text-2xl font-semibold text-white mb-6">Account Actions</h2>
          
          <div className="space-y-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full text-left p-4 bg-gray-900/50 rounded-lg hover:bg-gray-700/50 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <i className="fas fa-tachometer-alt text-cyan-400 mr-3"></i>
                  <span className="text-white">Go to Dashboard</span>
                </div>
                <i className="fas fa-arrow-right text-gray-500 group-hover:text-cyan-400 transition-colors"></i>
              </div>
            </button>

            <button
              onClick={handleSignOut}
              className="w-full text-left p-4 bg-red-500/10 rounded-lg hover:bg-red-500/20 transition-colors group border border-red-500/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <i className="fas fa-sign-out-alt text-red-400 mr-3"></i>
                  <span className="text-red-400">Sign Out</span>
                </div>
                <i className="fas fa-arrow-right text-red-400/50 group-hover:text-red-400 transition-colors"></i>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}